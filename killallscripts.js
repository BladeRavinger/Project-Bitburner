/** @param {NS} ns */
export async function main(ns) {
 const pserv = ns.getPurchasedServers();
 for (const sv of pserv) ns.killall(sv);
}