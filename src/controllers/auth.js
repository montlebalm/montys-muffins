var request = require('request');
var qs = require('qs');

module.exports = function(req, res) {
  var code = req.params.code;
  var client_id = process.env.POOPIN_CLIENT_ID;
  var client_secret = process.env.POOPIN_CLIENT_SECRET;

  console.log('CODE:', code);

  var url = 'https://slack.com/api/oauth.access?' + qs.stringify({
    client_id: client_id,
    client_secret: client_secret,
    code: code,
  });
  request.post(url, function(err, http, body) {
    console.log('OAUTH.ACCESS:', body);
    res.send(true);
  });
};
