/** @param {NS} ns */
export async function main(ns) {
 const net = ["n00dles", "foodnstuff", "sigma-cosmetics"];
 let a = ns.getScriptRam("/Scripts/hack-level-1.js")
 let delay = ns.getHackTime("sigma-cosmetics");

 ns.scp("/Scripts/hack-level-1.js", "sigma-cosmetics", "home");
 ns.mv("sigma-cosmetics", "/Scripts/hack-level-1.js", "hack-level-1.js")
 ns.nuke("sigma-cosmetics");

 for (const sv of net) {
  ns.exec("hack-level-1.js", sv, Math.trunc(ns.getServerMaxRam(sv) / a), sv);
 }
 await ns.sleep(delay);
 //ns.spawn("/Scripts/Stage3.js");

}