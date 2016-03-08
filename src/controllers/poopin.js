var PoopSvc = require('../services/poop');
var texts = require('../utils/texts');

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
  var team = req.body.team_id;

  PoopSvc.poopin(team, username).then(function(user) {
    res.publicReply(texts.poopin(user));
  }).catch(function(err) {
    res.errorReply(err);
  });

  // Let Slack know we didn't timeout
  res.send();
};
