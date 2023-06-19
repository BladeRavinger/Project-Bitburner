/** @param {NS} ns */
export async function main(ns) {
 const target = ns.args[0]
 //const slaves = ns.getPurchasedServers();
 const root = ns.getHostname();

 const hackRam = ns.getScriptRam("batch/hack.js");
 const growRam = ns.getScriptRam("batch/grow.js");
 const weakenRam = ns.getScriptRam("batch/weaken.js");

 const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
 const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

 while (true) {
  const rootMaxRam = ns.getServerMaxRam(root);

  const hackTime = ns.getHackTime(target);
  const growTime = ns.getGrowTime(target);
  const weakenTime = ns.getWeakenTime(target);

  const minSec = ns.getServerMinSecurityLevel(target);
  const sec = ns.getServerSecurityLevel(target);
  let weakenThreads = Math.ceil((sec - minSec) / ns.weakenAnalyze(1));

  let money = ns.getServerMoneyAvailable(target);
  if (money <= 0) money = 1; // division by zero safety
  let hackThreads = Math.ceil(ns.hackAnalyzeThreads(target, money));

  let maxMoney = ns.getServerMaxMoney(target);
  let growThreads = Math.ceil(ns.growthAnalyze(target, maxMoney / money));

  let rootUsedRam = ns.getServerUsedRam(root);
  let availableRam = rootMaxRam - rootUsedRam;
  let maxThreads = Math.floor(availableRam / Math.max(hackRam, growRam, weakenRam));

  if (ns.getServerSecurityLevel(target) > securityThresh) {
   // If the server's security level is above our threshold, weaken it
   weakenThreads = Math.min(maxThreads, weakenThreads);
   ns.exec("batch/weaken.js", root, weakenThreads, target);
   await ns.sleep(weakenTime);
  } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
   // If the server's money is less than our threshold, grow it
   growThreads = Math.min(maxThreads, growThreads);
   ns.exec("batch/grow.js", root, growThreads, target);
   await ns.sleep(growTime);
  } else {
   // Otherwise, hack it
   hackThreads = Math.min(maxThreads, hackThreads);
   ns.exec("batch/hack.js", root, hackThreads, target);
   await ns.sleep(hackTime);
  }

 }
}