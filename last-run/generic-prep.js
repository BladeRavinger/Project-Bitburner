/** @param {NS} ns */
export async function main(ns) {
 ns.disableLog("sleep");
 ns.disableLog("getServerMaxMoney");
 ns.disableLog("getServerMinSecurityLevel");
 ns.disableLog("getServerMaxRam");
 const target = ns.args[0];
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
 }
}