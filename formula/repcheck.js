/** @param {NS} ns */
export async function main(ns) {
 const value = ns.args[0];
 ns.tprint("Favor to Rep: " + ns.formulas.reputation.calculateFavorToRep(value))
 ns.tprint("Rep to Faver: " + ns.formulas.reputation.calculateRepToFavor(value))
}