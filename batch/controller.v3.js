import { ServerHackable } from "lib/serverHackable";
import { BasePlayer } from "lib/player";
/** @param {NS} ns */
export async function main(ns) {
 ns.disableLog("ALL");
 // Create Initial DataSet
 let list = listBuilder(ns);
 // break the returned array into targets and slaves
 let targets = list[0];
 let slaves = list[1];

 // Loop through Targets
 for (const target of targets) {
  // get decision variables
  const moneyThresh = target.money.max * 0.75;
  const securityThresh = target.security.min + 5;
  let script;
  let reqThreads;
  // Decide to Weaken(), Grow(), Hack();
  if (target.security.level > securityThresh) {
   //Weaken
   script = "batch/weaken.js"
   let sec = target.security.level;
   reqThreads = Math.ceil((sec - securityThresh) / ns.weakenAnalyze(1));
  } else if (target.money.available < moneyThresh) {
   // Grow
   script = "batch/weaken.js"
   let money = target.money.available;
   if (money <= 0) money = 1; // division by zero safety
   reqThreads = Math.ceil(ns.growthAnalyze(target.id, moneyThresh / money));
  } else {
   // Hack
   script = "batch/hack.js"
   let money = target.money.available;
   if (money <= 0) money = 1; // division by zero safety
   reqThreads = Math.ceil(ns.hackAnalyzeThreads(target.id, money));
  }

  if (!scriptRunningCheck(ns,script,target.id,slaves)){
   

  }

  // if flag is not true, find a server with enough ram to launch
  if (!flag) {
   for (const sv of slaves) {
    // get script ram
    let scriptRam = ns.getScriptRam(script, sv.id);
    //get server available threads from object
    let threadCount = sv.threadCount(scriptRam);
    // if enough threads break loop
   }
   // return sv;
  }
  ns.print(target.id + ": " + script)


 }


 // Get Security - Money
 // Decide to Weaken(), Grow(), Hack();
 // Check if Slave is running a command
 // Find Slave to run commands
 // if non have Ram run with 
}
function getServers(ns, current = "home", set = new Set()) {
 // Collects a list of all servers
 let connections = ns.scan(current)
 let next = connections.filter(c => !set.has(c))
 next.forEach(n => {
  set.add(n);
  return getServers(ns, n, set)
 })
 return Array.from(set.keys())
}
function listBuilder(ns) {
 let sList = getServers(ns);
 let targets = [];
 let slaves = [];
 // Get all Servers
 for (const s of sList) {
  // Get server Object
  let server = new ServerHackable(ns, s)
  // Run Nuke incase we dont have root, returns true if we have root access
  if (server.sudo()) {
   // if we do not own the server and it has money add to targets
   if (!server.purchased && server.money.max != 0) { targets.push(server) }
   // else add it to slaves list
   else { slaves.push(server) }
  }
 }
 // return both arrays of objects in an array
 return [targets, slaves];
}
function scriptRunningCheck(ns,script, target, slaves) {
 let skip = false;
 for (const sv of slaves) {
  // Loop all Slaves search script with Augs target
  skip = ns.getRunningScript(script, sv, target)
  if (skip) break;
 }
 return skip;
}

 // Closing thoughts for V3.
 // Choose Required scripts before Checking if its running. XXXX
 // return script to run, needed threads and slave as an array
 // use array to run all future functions.