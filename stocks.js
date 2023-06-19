/** @param {NS} ns */
export async function main(ns, stock = ns.stock) {
 ns.tprint(stock.has4SData())
 ns.tprint(stock.has4SDataTIXAPI())
 ns.tprint(stock.hasTIXAPIAccess())
 ns.tprint(stock.hasWSEAccount())
 for (const s of stock.getSymbols()) {
  ns.tprint(s + " - " + stock.getAskPrice(s) + " - " + stock.getBidPrice(s) + " - " +
   stock.getForecast(s) + " - " + stock.getOrganization(s) + " - " + stock.getPosition(s) + " - " +
   stock.getPrice(s) + " - " + stock.getVolatility(s))
  // ns.tprint(stock.getAskPrice(s))
  // ns.tprint(stock.getBidPrice(s))
  // ns.tprint(stock.getForecast(s))
  // ns.tprint(stock.getMaxShares(s))
  // ns.tprint(stock.getOrganization(s))
  // ns.tprint(stock.getPosition(s))
  // ns.tprint(stock.getPrice(s))
  // ns.tprint(stock.getVolatility(s))
 }

 //  ns.tprint(stock.getSaleGain())
 //  ns.tprint(stock.getPurchaseCost())
 //  ns.tprint(stock.buyShort())
 //  ns.tprint(stock.buyStock())
 //  ns.tprint(stock.cancelOrder())
 //  ns.tprint(stock.placeOrder())
 //  ns.tprint(stock.sellShort())
 //  ns.tprint(stock.sellStock())
}