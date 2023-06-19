/** @param {NS} ns */
import * as lib from "lib.js";
export async function main(ns) {
  let hostname = ns.args[0];
  let servers = lib.getServers();
  let i = 0;
  let length = servers.length;
  while (ns.getServerMaxMoney(hostname) > ns.getServerMoneyAvailable(hostname)){
  let delay = ns.getWeakenTime();
  while (i < length) {
    let val = servers[i];
    ns.print(val);
    if (ns.hasRootAccess(val)) {
      if (ns.fileExists("weaken.js") == false) {

      }
      ns.ftp
      await ns.scp("/mass_Ctl/weaken.js", val);
      await ns.exec("weaken.js", val, 1, hostname);
    }
    i++;
  }
  await ns.sleep(delay);
 }
}