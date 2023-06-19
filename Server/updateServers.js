/** @param {NS} ns */
export async function main(ns) {
 const pservers = ns.getPurchasedServers();
 for (const sv of pservers) {
  for (const f of ns.ls("home", "/Server/")) {
   ns.scp(f, sv, "home");
  }
 }
}