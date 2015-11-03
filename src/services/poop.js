var _ = require('lodash');
var mongoose = require('mongoose');

var dateKey = require('../utils/dateKey');

mongoose.connect(process.env.MONGOLAB_URI);

var daySchema = new mongoose.Schema({
  users: 'array',
  date: 'string'
});
var Day = mongoose.model('Day', daySchema);

module.exports = {
  poopin: function(username) {
    var key = dateKey(new Date());

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);

        if (!day) {
          var user = { name: username, count: 1 };
          Day.create({
            users: [user],
            date: key
          }, function(err) {
            if (err) return reject(err);
            resolve(user);
          });
        } else {
          var user = _.find(day.users, { name: username });
          if (!user) {
            user = { name: username, count: 0 };
            day.users.push(user);
          }
          user.count += 1;
          day.update(function(err) {
            if (err) return reject(err);
            resolve(user);
          });
        }
      });
    });
  },
  today: function() {
    var key = dateKey(new Date());

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);
        if (!day) return resolve([]);
        resolve(day.users);
      });
    });
  }
};
