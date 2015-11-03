var _ = require('lodash');

var dateKey = require('../utils/dateKey');

var usersByDate = {};

module.exports = {
  pooped: function(user) {
    var key = _dateKey(new Date());
    if (!usersByDate[key]) usersByDate[key] = {};
    if (!usersByDate[key][user]) usersByDate[key][user] = { name: user, count: 0 };
    usersByDate[key][user].count += 1;
    return Promise.resolve(usersByDate[key][user]);
  },
  today: function() {
    var key = _dateKey(new Date());
    return _.values(usersByDate[key]);
  }
};
