/**
 * Setup money.js
 */

const axios = require('axios').default;
const fx = require('money');
const {
  clone,
  iden,
  pick,
} = require('./utils');

// 1 hour
const REFRESH_INTERVAL = 3600000

const updateRates = () => axios
  .get(`https://api.fixer.io/latest?base=usd`)
  .then(pick('data.rates'))
  .then(clone(k => k.toLowerCase(), iden))
  .then(rates => fx.rates = rates)
  .then(() => setTimeout(updateRates, REFRESH_INTERVAL));

module.exports = updateRates;
