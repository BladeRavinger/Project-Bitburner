/** @param {NS} ns */
function updateOS(ns, hostname) {
 for (const f of ns.ls("home", "/Server/")) {
  ns.scp(f, hostname, "home");
 }
 for (const f of ns.ls("home", "/batch/")) {
  ns.scp(f, hostname, "home");
 }
}
/** @param {NS} ns */
function updateTitle(ns) {
 ns.disableLog("ALL");
 let title = "Server Manager: ";
 const pserver = ns.getPurchasedServers();
 const numServers = pserver.length;
 title = title + numServers;
 let ramAvail;
 let ramTotal;
 let ramUsage;
 for (const sv of pserver) {
  if (sv === "master") { ramTotal = 0; ramAvail = 0; ramUsage = 0; }
  ramTotal = ramTotal + ns.getServerMaxRam(sv);
  ramUsage = ramUsage + ns.getServerUsedRam(sv);
  ramAvail = ramAvail + (ns.getServerMaxRam(sv) - ns.getServerUsedRam(sv));
 }

 ramUsage = ramUsage / (ramTotal / 100);
 ramUsage = ramUsage.toFixed(2);
 title = title + " :Ram Usage: " + ramUsage + "%";
 if (ramAvail >= 1000000) {
  ramAvail = (ramAvail / 1000000);
  ramAvail = ramAvail.toFixed(2)
  title = title + " :Available: " + ramAvail + "Pb";
 } else {
  title = title + " :Available: " + ramAvail + "Tb";
 }
 if (ramTotal >= 1000000) {
  ramTotal = (ramTotal / 1000000);
  ramTotal = ramTotal.toFixed(2)
  title = title + " Total Ram: " + ramTotal + "Pb";
 } else {
  title = title + " Total Ram: " + ramTotal + "Tb";
 }
 ns.setTitle(title);
}
/** @param {NS} ns */
export async function main(ns) {
 ns.disableLog("ALL");
 while (true) {
  updateTitle(ns);
  let pservers = ns.getPurchasedServers();
  if (pservers == 0 && ns.getPurchasedServerCost(16) < ns.getServerMoneyAvailable("home")) {
   const hostname = "master";
   const script = "servermanager.js"
   ns.purchaseServer(hostname, 16);
   ns.scp(script, hostname);
   updateOS(ns, hostname);
   ns.exec(script, hostname);
   ns.scriptKill("servermanager.js", "home");
  } else {
   for (const sv of pservers) {
    let ram = ns.getServerMaxRam(sv);
    let cost = ns.getPurchasedServerUpgradeCost(sv, ram * 2);
    if (cost < ns.getServerMoneyAvailable("home")) {
     ns.upgradePurchasedServer(sv, ram * 2);
    }
    await ns.sleep(1000);
   }
   if (pservers.length < 25 && ns.getPurchasedServerCost(16) < ns.getServerMoneyAvailable("home")) {
    const name = "worker-" + pservers.length;
    ns.purchaseServer(name, 16);
    updateOS(ns, name);
   }
  }
  await ns.sleep(3000);
 }
}