var Hapi = require('hapi');

var PoopinController = require('./src/controllers/poopin');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/auth{code}{state?}',
  handler: function(request, reply) {
    reply(true);
  },
});

server.route({
  method: 'POST',
  path: '/poopin',
  handler: PoopinController,
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
