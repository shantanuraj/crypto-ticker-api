const Server = require('hapi').Server;
const H2o2   = require('h2o2');
const axios  = require('axios').default;

const enableCors = require('./cors');
const pick = require('./pick');

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
  path: '/bin',
  handler: () => axios.get(`https://api.binance.com/api/v1/ticker/allPrices`).then(pick('data'))
};

const routes = [
  defaultRoute,
  binanceRoute,
];

server.register(H2o2)
  .then(() => {
    server.ext('onPreResponse', enableCors);
    server.route(routes);
    return server.start();
  })
  .then(console.log(`Server running on ${server.info.uri}`))
  .catch(err => console.log('Error', err));
