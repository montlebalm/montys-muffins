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
  var commandText = req.body.text;

  if (commandText) {
    if (commandText == 'tomorrow') {
      return res.json({
        response_type: 'in_channel',
        text: 'It is dangerous to know your poop future.',
      });
    } else if (commandText == 'flush') {
      return PoopSvc.reset(username, moment().toDate()).then(function(success) {
        res.json({ text: username + ' is back to 0 poops', });
      }).catch(function(err) {
        res.json({ text: 'Couldn\'t flush the poop (' + err + ').', });
      });
    }

    var date = dateParser(commandText);

    if (!date) {
      return res.json({ text: 'You dum.', });
    }

    PoopSvc.report(date).then(function(users) {
      res.json({
        response_type: 'in_channel',
        text: texts.report(date, users),
      });
    });
  } else {
    res.json({
      response_type: 'in_channel',
      text: 'Congratulations',
    });
  }
};
