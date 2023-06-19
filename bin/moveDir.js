/** @param {NS} ns */
export async function main(ns) {
 const source = ns.args[0];
 const destination = ns.args[1];
 const hostname = ns.getHostname();
 for (const f of ns.ls(hostname, source)) {
  let g = f.slice(f.indexOf("/"))
  // ns.tprint(f + " to " + destination + g);
  ns.mv(hostname, f, destination + g);
 }
}