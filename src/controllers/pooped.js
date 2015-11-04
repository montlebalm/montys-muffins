var moment = require('moment');

var dateKey = require('../utils/dateKey');
var PoopSvc = require('../services/poop');

function _todayText(date, users) {
  if (!users || !users.length) {
    return 'OMG no one has pooped.';
  }

  var usersSorted = users.sort(function(a, b) {
    return a.count - b.count;
  });
  var usersCount = usersSorted.map(function(user) {
    return '  ' + user.name + ': ' + user.count;
  });

  var dayText = 'today';

  return [
    '```',
    'Poops for ' + dayText,
    usersCount.join('\n'),
    '```'
  ].join('\n');
}

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
  var user = req.body.user_name;
  var commandText = req.body.text;

  if (commandText) {
    console.log('COMMAND TEXT', commandText);
    var dateMoment = moment(commandText);
    var date = (dateMoment.isValid()) ? dateMoment.toDate() : new Date();

    PoopSvc.report(date).then(function(users) {
      res.json({
        attachments: [],
        response_type: 'in_channel',
        text: _todayText(date, users),
      });
    });
  } else {
    // Snarky response
    res.json({
      attachments: [],
      response_type: 'in_channel',
      text: 'Congratulations',
    });
  }
};
