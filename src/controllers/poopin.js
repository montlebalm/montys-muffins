var PoopSvc = require('../services/poop');

function _poopText(user, count) {
  var ordinals = ['first', 'second', 'third', 'fourth'];
  var txt;

  if (count == 1) {
    txt = user + ' is pooping for the first time today!';
  } else if (count < ordinals.length) {
    txt = user + ' is pooping for the ' + ordinals[count - 1] + ' time.';
  } else if (count == ordinals.length) {
    txt = user + ' has pooped ' + count + ' times! Poopbot is getting worried';
  } else if (count == ordinals.length + 1) {
    txt = 'Poopbot thinks something is wrong with ' + user + '. Poopbot has called the police.';
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
  var user = req.body.user_name;

  PoopSvc.pooped(user).then(function(count) {
    console.log("COUNT:", count);
    res.json({
      attachments: [],
      response_type: 'in_channel',
      text: _poopText(user, count),
    });
  });
};
