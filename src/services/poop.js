var _ = require('lodash');
var mongoose = require('mongoose');

var dateKey = require('../utils/dateKey');

mongoose.connect(process.env.MONGOLAB_URI);
var Day = mongoose.model('Day', { users: Object, date: String });

module.exports = {
  poopin: function(user) {
    var key = dateKey(new Date());

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        console.log('DAY:', day);
        if (err) return reject(err);
        if (!day) day = new Day({ users: {}, date: key });
        if (!day.users[user]) day.users[user] = { name: user, count: 0 };
        console.log('DAY:', day);

        day.users[user].count += 1;

        day.save(function(err) {
          if (err) return reject(err);
          resolve(day.users[user]);
        });
      });
    });
  },
  today: function() {
    var key = dateKey(new Date());

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);
        if (!day) return resolve([]);
        var users = _.values(day.users);
        resolve(users);
      });
    });
  }
};
