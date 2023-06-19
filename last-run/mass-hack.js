import { getServers } from "lib.js";
/** @param {NS} ns */
export async function main(ns) {
 let servers = getServers();
 for (const sv of servers) {
  if (ns.hasRootAccess(sv) == true) { continue; }
  if (ns.getServerRequiredHackingLevel(sv) > ns.getPlayer().skills.hacking) { continue; }
  if (ns.fileExists("BruteSSH.exe")) { ns.brutessh(sv) }
  if (ns.fileExists("FTPCrack.exe")) { ns.ftpcrack(sv) }
  if (ns.fileExists("relaySMTP.exe")) { ns.relaysmtp(sv) }
  if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(sv) }
  if (ns.fileExists("SQLInject.exe")) { ns.sqlinject(sv) }
  ns.nuke(sv);

  //ns.tprint(sv + " lvl: " + ns.getServerRequiredHackingLevel(sv) + " Money: " + ns.getServerMaxMoney(sv) + " Ports: " + ns.getServerNumPortsRequired(sv))
 }
}