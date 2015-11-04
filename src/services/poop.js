var _ = require('lodash');
var moment = require('moment');
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
    var key = dateKey(moment().toDate());

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);

        if (!day) {
          var user = { name: username, count: 1 };
          return Day.create({
            users: [user],
            date: key
          }, function(err, saved) {
            if (err) return reject(err);
            resolve(user);
          });
        }

        var user = _.find(day.users, { name: username });
        if (!user) {
          user = { name: username, count: 0 };
          day.users.push(user);
        }
        user.count += 1;

        Day.findOneAndUpdate({ date: key }, day, function(err, updated) {
          if (err) return reject(err);
          resolve(user);
        });
      });
    });
  },
  report: function(date) {
    var key = dateKey(date);

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);
        if (!day) return resolve([]);
        resolve(day.users);
      });
    });
  }
};
