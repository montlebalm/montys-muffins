var PoopSvc = require('../services/poop');

function _poopText(user) {
  var ordinals = ['first', 'second', 'third', 'fourth'];
  var txt;

  if (user.count == 1) {
    txt = user.name + ' is pooping for the first time today!';
  } else if (user.count < ordinals.length) {
    txt = user.name + ' is pooping for the ' + ordinals[user.count - 1] + ' time.';
  } else if (user.count == ordinals.length) {
    txt = user.name + ' has pooped ' + user.count + ' times! Poopbot is getting worried';
  } else if (user.count == ordinals.length + 1) {
    txt = 'Poopbot thinks something is wrong with ' + user.name + '. Poopbot has called the police.';
  } else {
    txt = 'Poopbot thinks your playing a poopy joke and chooses not to engage.';
  }

  return txt;
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

  PoopSvc.poopin(username).then(function(user) {
    res.json({
      attachments: [],
      response_type: 'in_channel',
      text: _poopText(user),
    });
  }).catch(function() {
    res.json({
      attachments: [],
      response_type: 'in_channel',
      text: 'The server pooped. Try again.',
    });
  });;
};
