/** @param {NS} ns */
export async function main(ns) {
 ns.disableLog("sleep");
 let arg = ns.args[0];
 let it = 0;
 while (true) {
  await ns.hack(arg);
  it++
  ns.setTitle(arg + " hack num " + it);
  await ns.sleep(3000);
 }
}