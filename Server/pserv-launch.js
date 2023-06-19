/** @param {NS} ns */
export async function main(ns) {
 const pservers = ns.getPurchasedServers();
 const target = ns.args[0];
 ns.print(target);
 for (const sv of pservers) {
  if (sv === "master") { continue; }
  if (sv === "worker-1") { runHack(sv, target, ns); continue; }
  runPrep(sv, target, ns)
  await ns.sleep(ns.getWeakenTime(sv) / 25);
 }
}

function runHack(sv, target, ns) {
 const script = "/Server/runhack.js";
 const scriptram = ns.getScriptRam(script);
 const serverram = ns.getServerMaxRam(sv);
 const threadcount = Math.trunc(serverram / scriptram);
 if (ns.scriptRunning(script, sv)) {
  ns.scriptKill(script, sv);
 }
 ns.exec(script, sv, threadcount, target);
}

function runPrep(sv, target, ns) {
 const script = "/Server/pserv-prep.js";
 const scriptram = ns.getScriptRam(script);
 const serverram = ns.getServerMaxRam(sv);
 const threadcount = Math.trunc(serverram / scriptram);
 if (ns.scriptRunning(script, sv)) {
  ns.scriptKill(script, sv);
 }
 ns.exec(script, sv, threadcount, target);
}