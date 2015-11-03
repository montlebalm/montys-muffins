var request = require('request');
var qs = require('qs');

var CLIENT_ID = process.env.POOPIN_CLIENT_ID;
var CLIENT_SECRET = process.env.POOPIN_CLIENT_SECRET;

module.exports = function(req, reply) {
  var code = req.params.code;
  var state = req.params.state;

  var url = 'https://slack.com/api/oauth.access?' + qs.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
  });

  request.post(url, function(err, res, body) {
    console.log('OAUTH.ACCESS:', body);
    reply(true);
  });
};
