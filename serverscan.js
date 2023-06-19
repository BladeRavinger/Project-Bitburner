import { getServers } from "lib.js";
/** @param {NS} ns */
export async function main(ns) {
 let servers = getServers();
 ns.tprint(servers);
 for (const sv of servers){
  ns.tprint(sv + " lvl: " + ns.getServerRequiredHackingLevel(sv) + " Money: " + ns.getServerMaxMoney(sv) + " Ports: " + ns.getServerNumPortsRequired(sv) )
 }
}