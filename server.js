const Server = require('hapi').Server;
const H2o2   = require('h2o2');
const axios  = require('axios').default;

const enableCors = require('./cors');
const pick = require('./pick');

const pickData = pick('data');

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
  handler: () => axios.get(`https://api.binance.com/api/v1/ticker/allPrices`).then(pickData)
};

const koinexRoute = {
  method: 'GET',
  path: '/knx',
  handler: () => axios.get(`https://koinex.in/api/ticker`).then(pickData)
};

const routes = [
  defaultRoute,
  binanceRoute,
  koinexRoute,
];

server.register(H2o2)
  .then(() => {
    server.ext('onPreResponse', enableCors);
    server.route(routes);
    return server.start();
  })
  .then(console.log(`Server running on ${server.info.uri}`))
  .catch(err => console.log('Error', err));
