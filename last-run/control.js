/** @param {NS} ns */
export async function main(ns) {
  const hostname = ns.getHostname();
  while (true) {
    let WT = ns.getWeakenTime(hostname);
    let GT = ns.getGrowTime(hostname);
    let HT = ns.getHackTime(hostname);
    ns.print("Weakentime: " + WT);
    ns.print("Growtime: " + GT);
    ns.print("Hacktime: " + HT);
    if (ns.getServerSecurityLevel(hostname) != ns.getServerMinSecurityLevel(hostname)) {
      await ns.weaken(hostname);
    } else if (ns.getServerMaxMoney(hostname) != ns.getServerMoneyAvailable(hostname)) {
      await ns.grow(hostname);
    } else {
      await ns.hack(hostname);
    }
  }
}