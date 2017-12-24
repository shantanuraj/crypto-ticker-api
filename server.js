const Server = require('hapi').Server;
const H2o2   = require('h2o2');
const axios  = require('axios').default;

const enableCors = require('./cors');
const money = require('./money');

const adaptBinance = require('./adapters/binance');
const adaptKoinex = require('./adapters/koinex');
const adaptBitrex = require('./adapters/bitrex');

const server = new Server({
  port: '5003'
});

const defaultRoute = {
  method: 'GET',
  path: '/{p*}',
  handler: {
    proxy: {
      host: 'api.bitfinex.com',
      port: '443',
      protocol: 'https',
      passThrough: true,
    }
  }
};

const binanceRoute = {
  method: 'GET',
  path: '/bnc',
  handler: () => axios.get(`https://api.binance.com/api/v1/ticker/allPrices`).then(adaptBinance),
};

const koinexRoute = {
  method: 'GET',
  path: '/knx',
  handler: () => axios.get(`https://koinex.in/api/ticker`).then(adaptKoinex),
};

const bitrexRoute = {
  method: 'GET',
  path: '/brx',
  handler: (req) => axios.get(`https://bittrex.com/api/v1.1/public/getticker?market=` + req.query.market).then(adaptBitrex),
}

const routes = [
  defaultRoute,
  binanceRoute,
  koinexRoute,
];

const start = async () => {
  console.log('Updating rates');
  await money.init();
  console.log('Rates updated ');

  await server.register(H2o2);
  server.ext('onPreResponse', enableCors);
  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

start().catch(console.log);
