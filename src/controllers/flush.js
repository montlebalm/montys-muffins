var moment = require('moment');

var PoopSvc = require('../services/poop');

/**
 * Request Example:
 *   payload:
 *     token=78s8di2HgR3bEBME1OfdZslQ
 *     team_id=T0001
 *     team_domain=example
 *     channel_id=C2147483705
 *     channel_name=test
 *     user_id=U2147483697
 *     user_name=Steve
 *     command=/weather
 *     text=94070
*/
module.exports = function(req, res) {
  var username = req.body.user_name;

  PoopSvc.reset(username, moment().toDate()).then(function() {
    res.json({ text: username + ' is back to 0 poops', });
  }).catch(function(err) {
    res.json({ text: 'Couldn\'t flush the poop (' + err + ').', });
  });
};
