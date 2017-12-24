/**
 * Binance response adapter
 */

const {
  pick,
} = require('../utils');

const adapt = (res) => {
  const data = pick('data')(res);
  const btcPrice = parseFloat(data.find(o => o.symbol === 'BTCUSDT').price);
  const pairs = data.filter(o => o.symbol.endsWith('BTC'));
  const prices = pairs.reduce((acc, {symbol, price}) => ({...acc, [symbol.slice(0, -3).toLowerCase()]: btcPrice * parseFloat(price)}), {});
  return prices;
}

module.exports = adapt;
