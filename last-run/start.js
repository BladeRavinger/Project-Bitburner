/** @param {NS} ns */
export async function main(ns) {
 const net = ["n00dles", "foodnstuff"];
 let a = ns.getScriptRam("/Scripts/hack-level-1.js")
 let delay = ns.getHackTime("foodnstuff");
 for (const sv of net) {
  let tc = Math.trunc(ns.getServerMaxRam(sv) / a)
  ns.scp("/Scripts/hack-level-1.js", sv, "home");
  ns.mv(sv, "/Scripts/hack-level-1.js", "hack-level-1.js")
  ns.nuke(sv);
  ns.exec("hack-level-1.js", sv, tc, sv);
 }
 await ns.sleep(delay);
 ns.spawn("/Scripts/Stage2.js");
}