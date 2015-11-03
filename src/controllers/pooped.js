var PoopSvc = require('../services/poop');

var dateKey = require('../utils/dateKey');

function _todayText(users) {
  if (!users || !users.length) {
    return 'OMG... no one has pooped today';
  }

  var usersCount = users.map(function(user) {
    return '  ' + user.name + ': ' + user.count + '\n';
  });

  return [
    '```',
    'Poops today:',
    usersCount,
    '```'
  ];
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
  var command = req.body.command;

  if (command.indexOf('today') !== -1) {
    PoopSvc.today().then(function(users) {
      res.json({
        attachments: [],
        response_type: 'in_channel',
        text: _todayText(users),
      });
    });
  } else {
    res.json({
      attachments: [],
      response_type: 'in_channel',
      text: 'Congratulations',
    });
  }
};
