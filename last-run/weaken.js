/** @param {NS} ns */
export async function main(ns) {
 let hostname = ns.args[0];
 await ns.weaken(hostname);
 await ns.sleep(1);
}