/**
 * Binance response adapter
 */

const money = require('../money');
const {
  clone,
  pick,
} = require('../utils');

const normalizeObj = clone(k => k.toLowerCase(), money.convert('inr', 'usd'));

const adapt = (res) => normalizeObj(pick('data.prices.inr')(res));

module.exports = adapt;
