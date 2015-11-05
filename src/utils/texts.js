var _ = require('lodash');
var moment = require('moment');

module.exports = {
  dateLabel: function(date) {
    if (moment(date).isSame(moment(), 'day')) {
      return 'today';
    } else if (moment(date).isSame(moment().add(-1, 'day'), 'day')) {
      return 'yesterday';
    }
    return moment(date).format('M-D-YY');
  },
  report: function(date, users) {
    if (!users || !users.length) return 'OMG no one has pooped.';

    var usersText = _(users).sortBy('count').map(function(user) {
      return '- ' + user.name + ': ' + user.count;
    });

    return [
      '*Doodie digest for ' + this.dateLabel(date) + '*',
      usersText.join('\n'),
    ].join('\n');
  },
  poopin: function(user) {
    var ordinals = ['first', 'second', 'third'];

    if (user.count == 1) {
      return user.name + ' is pooping for the first time today!';
    } else if (user.count <= ordinals.length) {
      return user.name + ' is pooping for the ' + ordinals[user.count - 1] + ' time.';
    } else if (user.count == ordinals.length + 1) {
      return user.name + ' has pooped ' + user.count + ' times! Poopbot is getting worried';
    } else if (user.count == ordinals.length + 2) {
      return 'Something is wrong with ' + user.name + '. Poopbot will hide the prune juice.';
    }

    return 'Poopbot thinks ' + user.name + ' is playing a poopy joke and chooses not to engage.';
  }
};
