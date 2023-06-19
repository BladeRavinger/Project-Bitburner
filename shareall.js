/** @param {NS} ns */
export async function main(ns) {
 const script = "/Server/share.js";

 const scriptRam = ns.getScriptRam(script)

 for (const sv of ns.getPurchasedServers()) {
  const maxRam = ns.getServerMaxRam(sv);
  let maxThreads = Math.trunc(maxRam / scriptRam);
  if (maxThreads <= 0) maxThreads = 1;
  
  ns.scp(script,sv,"home");
  // ns.killall(sv);
  ns.exec(script,sv,maxThreads);

 }
}