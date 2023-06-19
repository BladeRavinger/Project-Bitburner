/** @param {NS} ns */
export async function main(ns) {
 while (true) {
  let hostname = ns.args[0];
  await ns.grow(hostname);
 }
}