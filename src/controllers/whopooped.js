var moment = require('moment');

var dateKey = require('../utils/dateKey');
var dateParser = require('../utils/dateParser');
var PoopSvc = require('../services/poop');

function _dayText(date) {
  var dayText;
  if (moment(date).isSame(moment(), 'day')) {
    dayText = 'today';
  } else if (moment(date).isSame(moment().add(-1, 'day'), 'day')) {
    dayText = 'yesterday';
  } else {
    dayText = moment(date).format('M-D-YY');
  }
  return dayText;
}

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


  return [
    '```',
    'Poops for ' + _dayText(date),
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
      }).catch(function() {
        res.json({ text: 'Couldn\'t flush the poop.', });
      });
    }

    var date = dateParser(commandText);

    if (!date) {
      return res.json({ text: 'You dum.', });
    }

    PoopSvc.report(date).then(function(users) {
      res.json({
        response_type: 'in_channel',
        text: _todayText(date, users),
      });
    });
  } else {
    res.json({
      response_type: 'in_channel',
      text: 'Congratulations',
    });
  }
};
