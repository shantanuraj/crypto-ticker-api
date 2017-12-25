/**
 * Bitrex response adapter
 */

const axios = require('axios').default;

const {
  pick,
} = require('../utils');

const pickPrice = obj => parseFloat(pick('data.result.Ask')(obj));

const adapt = market => async (res) => {
  const priceInCrypto = pickPrice(res);
  if (market.toLowerCase().indexOf('usdt') > -1) {
    return priceInCrypto;
  }

  const [ crypto ] = market.split('-');
  const cryptoPrice = await axios.get(`https://bittrex.com/api/v1.1/public/getticker?market=usdt-${crypto}`)
    .then(pickPrice)
    .catch(err => (console.log(err), 0));

  return priceInCrypto * cryptoPrice;
};

module.exports = adapt;
