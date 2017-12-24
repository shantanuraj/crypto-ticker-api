/**
 * Bitfinex response adapter
 */

const {
  pick,
} = require('../utils');

const adapt = pick('data.last_price');

module.exports = adapt;
