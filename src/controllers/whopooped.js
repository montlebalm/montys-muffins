var moment = require('moment');

var dateParser = require('../utils/dateParser');
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
  var args = req.body.text;

  if (args == 'tomorrow') return res.json({ text: 'It is dangerous to know your poop future.', });

  var date = dateParser(args) || moment().toDate();

  PoopSvc.report(date).then(function(users) {
    res.json({
      response_type: 'in_channel',
      text: texts.report(date, users),
    });
  }).catch(function(err) {
    res.json({ text: 'Oh no (' + err + ')', });
  });
};
