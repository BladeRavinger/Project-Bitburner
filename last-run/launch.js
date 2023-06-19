import * as lib from "lib.js";
/** @param {NS} ns */
export async function main(ns) {
 const target = ns.args[0];
 let net = lib.getServers();

 for (const sv of net) {
  let svram = ns.getServerMaxRam(sv);
  if (svram == 0) { continue; };
  if (!ns.hasRootAccess(sv)) { continue; }
  if (sv == target) {
   let scram = ns.getScriptRam("/Scripts/self.js");
   let tc = Math.trunc(svram / scram);
   ns.scp("/Scripts/self.js", sv, "home");
   ns.killall(sv);
   ns.exec("/Scripts/self.js", sv, tc, target);
  } else {
   let scram = ns.getScriptRam("/Scripts/generic-prep.js");
   ns.scp("/Scripts/generic-prep.js", sv, "home");
   ns.killall(sv);
   ns.exec("/Scripts/generic-prep.js", sv, Math.trunc(svram / scram), target);
  }
  await ns.sleep(ns.getGrowTime(target) / 10)
 }
}