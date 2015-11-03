var PoopSvc = require('../services/poop');

var ORDINALS = ['first', 'second', 'third'];

module.exports = function(request, reply) {
  var user = request.payload.user_name;

  PoopSvc.pooped(user).then(function(count) {
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

    reply({
      response_type: 'in_channel',
      text: user + ' is poopin',
      attachments: [],
    });
  });
};
