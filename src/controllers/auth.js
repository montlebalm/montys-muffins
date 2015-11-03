var request = require('request');

var CLIENT_ID = process.env.POOPIN_CLIENT_ID;
var CLIENT_SECRET = process.env.POOPIN_CLIENT_SECRET;

module.exports = function(request, reply) {
  var code = request.params.code;
  var state = request.params.state;

  request.get('https://slack.com/api/oauth.access', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: 'https://pooping.herokuapp.com/auth',
  }, function(err, res, body) {
    reply(true);
  });
};