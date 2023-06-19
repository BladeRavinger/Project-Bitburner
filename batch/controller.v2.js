import { ServerHackable } from "lib/server";
import { BasePlayer } from "lib/player";
/** @param {NS} ns */
function getTargetServers(ns, current = "home", set = new Set()) {
 // Collects a list of all servers
 let connections = ns.scan(current)
 let next = connections.filter(c => !set.has(c))
 next.forEach(n => {
  set.add(n);
  return getTargetServers(ns, n, set)
 })
 return Array.from(set.keys()).filter(
  s => !ns.getPurchasedServers().includes(s) // filters Personal Servers
   && s != "home"
   && ns.getServerMaxMoney(s) > 0 //filters poor servers
 )
}
/** @param {NS} ns */
function scriptRunningCheck(ns, target, slaves) {
 let skip = false;
 for (const sv of slaves) {
  // Loop all Slaves search for scripts (Hack(), Grow(), Weaken()) with Augs target
  skip = ns.getRunningScript("batch/hack.js", sv, target) ||
   ns.getRunningScript("batch/grow.js", sv, target) ||
   ns.getRunningScript("batch/weaken.js", sv, target)
  if (skip) break;
 }
 return skip;
}

/** @param {NS} ns */
function chooseScript(ns, target) {
 // collect variables needed to assess the current target
 const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
 const securityThresh = ns.getServerMinSecurityLevel(target) + 5;
 let script;
 if (ns.getServerSecurityLevel(target) > securityThresh) {
  // If the server's security level is above our threshold, weaken it
  script = "weaken";
 } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
  // If the server's money is less than our threshold, grow it
  script = "grow"
 } else {
  // Otherwise, hack it
  script = "hack"
 }
 return script;
}
/** @param {NS} ns */
function getSlave(ns, slaves, script, reqThreads) {

 let scriptRam = ns.getScriptRam(`batch/${script}.js`, "home");
 for (const sv of slaves) {
  // find a server with enough ram to run the threads needed
  const svMaxRam = ns.getServerMaxRam(sv);
  const svUsedRam = ns.getServerUsedRam(sv);
  let availableRam = svMaxRam - svUsedRam;
  let maxThreads = Math.floor(availableRam / scriptRam);
  if (maxThreads >= reqThreads) return sv;
 }
 return "skip";
}

/** 
 * MAIN FUNTION 
 * */
/** @param {NS} ns */
export async function main(ns) {
 ns.disableLog("ALL");
 // collect constants required for autonomous opperation
 const sList = getTargetServers(ns);
 let targets = [];
 for (const s of sList) {
  targets.push(new ServerHackable(ns, s))
 }
 const slaves = ns.getPurchasedServers();
 slaves.unshift("home");





 while (true) {
  // For each target
  for (const target of targets) {
   // If script already running against current target, skip this loop
   if (scriptRunningCheck(ns, target.id, slaves)) continue;

   // Else dicide what script to use (Hack(), Grow(), Weaken())
   let script = chooseScript(ns, target.id);
   // Calc Threads needed
   let reqThreads;
   if (script === "weaken") {
    // calculated threads needed to reduce security to 0
    const minSec = target.security.min;
    const sec = target.security.level;
    reqThreads = Math.ceil((sec - minSec) / ns.weakenAnalyze(1));
   } else if (script === "grow") {
    // calculate threads needed to grow to max money
    let money = target.money.available;
    if (money <= 0) money = 1;
    let maxMoney = target.money.max;
    reqThreads = Math.ceil(ns.growthAnalyze(target.id, maxMoney / money));
   } else {
    // calculate threads needed to take all the money
    let money = ns.getServerMoneyAvailable(target.id);
    if (money <= 0) money = 1; // division by zero safety
    reqThreads = Math.ceil(ns.hackAnalyzeThreads(target.id, money));
   }
   // Find a Slave with space
   let slave = getSlave(ns, slaves, script, reqThreads)
   // Launch command
   if (slave === "skip") continue;
   if (target.admin) {
    ns.exec(`batch/${script}.js`, slave, reqThreads, target.id);
    ns.print("Attacking " + target.id + " with " + script + " -t " + reqThreads);
   }
   // return
  }
  await ns.sleep(3000);
 }
 // Closing thoughts for V3.
 // Choose Required scripts before Checking if its running.
 // return script to run, needed threads and slave as an array
 // use array to run all future functions.
}