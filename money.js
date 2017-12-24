/**
 * Setup money.js
 */

const axios = require('axios').default;
const {
  clone,
  iden,
  pick,
} = require('./utils');

const money = {
  init: () => updateRates(),
  rates: { usd: 1.0 },
  convert: (from, to) => val => money.rates[to] / money.rates[from] * val,
};

// 1 hour
const REFRESH_INTERVAL = 3600000;

const toLower = k => k.toLowerCase();

const updateRates = () => axios
  .get(`https://api.fixer.io/latest?base=usd`)
  .then(pick('data.rates'))
  .then(clone(toLower, iden))
  .then(rates => Object.assign(money.rates, rates))
  .then(() => setTimeout(updateRates, REFRESH_INTERVAL));

module.exports = money;
