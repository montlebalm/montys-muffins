var _ = require('lodash');
var moment = require('moment');

var dateKey = require('../utils/dateKey');
var Day = require('../models/day');

module.exports = {
  poopin: function(username) {
    var key = dateKey(moment().toDate());

    console.log('POOPIN FOR:', username, key);

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

    console.log('REPORT FOR:', key);

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);
        if (!day) return resolve([]);
        resolve(day.users);
      });
    });
  },
  reset: function(username, date) {
    var key = dateKey(date);

    console.log('RESET FOR:', username, key);

    return new Promise(function(resolve, reject) {
      Day.findOne({ date: key }, function(err, day) {
        if (err) return reject(err);
        if (!day) return reject('No day');

        var user = _.find(day.users, { name: username });
        if (!user) return reject('No matching user');

        user.count = 0;

        Day.findOneAndUpdate({ date: key }, day, function(err, updated) {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });
  }
};
