export function myMoney(ns) {
 return ns.getServerMoneyAvailable("home");
}
/** @param {NS} ns */
export function getTargetServers(ns, current = "home", set = new Set()) {
 let connections = ns.scan(current)
 let next = connections.filter(c => !set.has(c))
 next.forEach(n => {
  set.add(n);
  return getTargetServers(ns, n, set)
 })
 return Array.from(set.keys()).filter(
  s => !ns.getPurchasedServers().includes(s) 
  && s != "home" 
  && ns.getServerMaxMoney(s) > 0
  && ns.getServerMaxRam(s) > 0
  )
}
/** @param {NS} ns */
export function getAllServers(ns, current = "home", set = new Set()) {
 let connections = ns.scan(current)
 let next = connections.filter(c => !set.has(c))
 next.forEach(n => {
  set.add(n);
  return getTargetServers(ns, n, set)
 })
 return Array.from(set.keys()).filter(s =>  s != "home")
}