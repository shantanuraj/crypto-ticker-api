const Server = require('hapi').Server
const H2o2   = require('h2o2')
const enableCors = require('./cors')

const server = new Server({
  port: '5002'
})

const route = {
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
}

server.register(H2o2)
  .then(() => {
    server.ext('onPreResponse', enableCors)
    server.route(route)
    return server.start()
  })
  .then(console.log(`Server running on ${server.info.uri}`))
  .catch(err => console.log('Error', err))
