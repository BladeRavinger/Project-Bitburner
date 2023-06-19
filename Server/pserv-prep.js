/** @param {NS} ns */
export async function main(ns) {
 const hostname = ns.getHostname();
 ns.disableLog("sleep");
 ns.disableLog("getServerMaxMoney");
 ns.disableLog("getServerMinSecurityLevel");
 ns.disableLog("getServerMaxRam");
 const startram = ns.getServerMaxRam(hostname);
 const target = ns.args[0];
 ns.setTitle(hostname + " Prepping: " + target);
 while (true) {
  let max = ns.getServerMaxMoney(target);
  let avail = ns.getServerMoneyAvailable(target);
  let min = ns.getServerMinSecurityLevel(target);
  let sec = ns.getServerSecurityLevel(target);
  if (sec > min) {
   await ns.weaken(target);
  } else if (max > avail) {
   await ns.grow(target);
  }
  await ns.sleep(3000)
  if (startram != ns.getServerMaxRam(hostname)) {
   let sram = ns.getScriptRam("/Server/pserv-prep.js", hostname);
   let avram = ns.getServerMaxRam(hostname);
   ns.spawn("/Server/pserv-prep.js", Math.trunc(avram / sram),target);
  }
 }
}