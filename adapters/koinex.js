/**
 * Binance response adapter
 */

const fx = require('money');

const {
  clone,
  pick,
} = require('../utils');

const toUSD = (val) => fx.convert(parseFloat(val), { from: 'inr', to: 'usd' });

const normalizeObj = clone(k => k.toLowerCase(), toUSD);

const adapt = (res) => {
  try {
    return normalizeObj(pick('data.prices')(res));
  } catch(err) {
    console.log(err);
    return {};
  }
}

module.exports = adapt;
