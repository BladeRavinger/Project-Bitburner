/** @param {NS} ns */
export async function main(ns) {
 function myMoney() {
  return ns.getServerMoneyAvailable("home");
 }

 ns.disableLog("getServerMoneyAvailable");
 ns.disableLog("sleep");

 const cnt = 8;
 let res;
 while (ns.hacknet.numNodes() < cnt) {
  res = ns.hacknet.purchaseNode();
  if (res != -1) ns.print("Purchased hacknet Node with index " + res);
  await ns.sleep(1000);
 };

 ns.tprint("All " + cnt + " nodes purchased")

 for (var i = 0; i < cnt; i++) {
  while (ns.hacknet.getNodeStats(i).level <= 80) {
   var cost = ns.hacknet.getLevelUpgradeCost(i, 1);
   while (myMoney() < cost) {
    ns.print("Need $" + cost + " . Have $" + myMoney());
    await ns.sleep(3000);
   }
   res = ns.hacknet.upgradeLevel(i, 1);
  };
 };

 ns.tprint("All nodes upgraded to level 80");

 for (var i = 0; i < cnt; i++) {
  while (ns.hacknet.getNodeStats(i).ram < 16) {
   var cost = ns.hacknet.getRamUpgradeCost(i, 1);
   while (myMoney() < cost) {
    ns.print("Need $" + cost + " . Have $" + myMoney());
    await ns.sleep(3000);
   }
   res = ns.hacknet.upgradeRam(i, 1);
  };
 };

 ns.tprint("All nodes upgraded to 16GB RAM");

 for (var i = 0; i < cnt; i++) {
  while (ns.hacknet.getNodeStats(i).cores < 8) {
   var cost = ns.hacknet.getCoreUpgradeCost(i, 1);
   while (myMoney() < cost) {
    ns.print("Need $" + cost + " . Have $" + myMoney());
    await ns.sleep(3000);
   }
   res = ns.hacknet.upgradeCore(i, 1);
  };
 };

 ns.tprint("All nodes upgraded to 8 cores");
}