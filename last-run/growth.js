import * as lib from "/lib.js";
/** @param {NS} ns */
export async function main(ns) {
 let hostname = ns.args[0];
 let pserv = ns.getPurchasedServers();
 let sram = ns.getScriptRam("mass_Ctl/grow.js");
 for (const sv of pserv) {
  let threads = ns.getServerMaxRam(sv) / sram;
  threads = Math.trunc(threads);
  if (ns.fileExists("mass_Ctl/grow.js",sv) == false) {

   ns.scp("mass_Ctl/grow.js",sv);
  }
  ns.exec("mass_Ctl/grow.js", sv, threads, hostname);
 }
}