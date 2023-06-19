/** @param {NS} ns */
export async function main(ns) {
let mode = ns.args[0];//mode 1 rename, mode 2 delete
let hostname = ns.args[1];//name of server to affect
let arg3 = ns.args[2];//remane too or ram
if (mode == 1){ns.renamePurchasedServer(hostname,arg3)}
if (mode == 2){ns.deleteServer(hostname);}
}