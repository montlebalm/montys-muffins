var Hapi = require('hapi');

var AuthController = require('./src/controllers/auth');
var PoopinController = require('./src/controllers/poopin');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/auth',
  handler: AuthController,
});

server.route({
  method: 'POST',
  path: '/poopin',
  handler: PoopinController,
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
