/** @param {NS} ns */
export async function main(ns) {
 const target = ns.args[0];
 ns.setTitle("Hack on: " + target);
 while (true) {
  ns.print(ns.getServerMoneyAvailable(target));
  ns.print(ns.getServerMaxMoney(target));
  if (ns.getServerMoneyAvailable(target) !== ns.getServerMaxMoney(target)) {
   await ns.sleep(ns.getGrowTime(target) / 4);
  } else { await ns.hack(target); }
 }
}