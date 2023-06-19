/** @param {NS} ns */
export async function main(ns) {
   let pservs = ns.getPurchasedServers();
   ns.tprint(pservs);
  for (const sv of pservs) {
   ns.tprint(sv + "RAM: " + ns.getServerMaxRam(sv));
  }
}