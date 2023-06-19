/** @param {NS} ns */
export async function main(ns) {
 const net = ["foodnstuff", "n00dles", "sigma-cosmetics"];
 const target = "joesguns";
 let sram = ns.getScriptRam("/Scripts/joes-prep.js", "home");
 ns.nuke(target);
 for (const sv of net) {
  ns.killall(sv);
  ns.scp("/Scripts/joes-prep.js", sv, "home");
  ns.mv(sv, "/Scripts/joes-prep.js", "joes-prep.js");
  ns.exec("joes-prep.js", sv, Math.trunc(ns.getServerMaxRam(sv) / sram));
  await ns.sleep(10000);
 }
 sram = ns.getScriptRam("/Scripts/joes-hack.js", "home");
 ns.spawn("/Scripts/joes-hack.js",Math.trunc(ns.getServerMaxRam("home") / sram))
}