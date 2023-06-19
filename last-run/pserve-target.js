/** @param {NS} ns */
export async function main(ns) {
 let target = ns.args[0];
 ns.exec("/Server/pserv-launch.js","master",1,target)
}