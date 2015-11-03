var Hapi = require('hapi');

var PoopinController = require('./src/controllers/poopin');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

/**
 * Example:
 *  token=78s8di2HgR3bEBME1OfdZslQ
 *  team_id=T0001
 *  team_domain=example
 *  channel_id=C2147483705
 *  channel_name=test
 *  user_id=U2147483697
 *  user_name=Steve
 *  command=/weather
 *  text=94070
*/
server.route({
  method: 'POST',
  path: '/poopin',
  handler: PoopinController,
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
