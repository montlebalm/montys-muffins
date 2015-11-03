var PoopSvc = require('../services/poop');

var ORDINALS = ['first', 'second', 'third'];

function _poopText(count) {
  var txt;

  if (count == 1) {
    txt = user + ' is pooping for the first time today!';
  } else if (count < ORDINALS.length) {
    txt = user + ' is pooping for the ' + ORDINALS[count - 1] + ' time.';
  } else if (count > 10) {
    txt = 'Poopbot thinks something is wrong with ' + user + '. Poopbot has called the police.';
  } else {
    txt = user + ' has pooped ' + count + ' times! Poopbot is getting worried';
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
  var user = req.payload.user_name;

  console.log(req);

  PoopSvc.pooped(user).then(function(count) {
    res.json({
      attachments: [],
      response_type: 'in_channel',
      text: _poopText(count),
    });
  });
};
