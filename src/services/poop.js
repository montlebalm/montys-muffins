var _ = require('lodash');

var dateKey = require('../utils/dateKey');

var usersByDate = {};

module.exports = {
  pooped: function(user) {
    var key = dateKey(new Date());
    if (!usersByDate[key]) usersByDate[key] = {};
    if (!usersByDate[key][user]) usersByDate[key][user] = { name: user, count: 0 };
    usersByDate[key][user].count += 1;
    var user = usersByDate[key][user];
    return Promise.resolve(user);
  },
  today: function() {
    var key = dateKey(new Date());
    var users = _.values(usersByDate[key]);
    return Promise.resolve(users);
  }
};
