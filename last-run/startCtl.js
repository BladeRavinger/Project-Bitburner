/** @param {NS} ns */
import * as lib from "lib.js";
export async function main(ns) {
 let servers = lib.getServers();
 let i = 0;
 let l = servers.length;
 while (i < l) {
  let host = servers[i];
  if (ns.hasRootAccess(host)) {
   await ns.scp("/mass_Ctl/control.js", host);
   await ns.exec("control.js", host);
  }
  i++;
  await ns.sleep(1);
 }
}