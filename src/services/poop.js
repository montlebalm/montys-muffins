var _ = require('lodash');
var moment = require('moment');

var dateKey = require('../utils/dateKey');
var db = require('../models/db');

db.connect();
var Team = db.Team;

module.exports = {
  poopin: function(teamId, username) {
    var key = dateKey(moment().toDate());

    console.log('POOPIN FOR:', username, key);

    return new Promise(function(resolve, reject) {
      db.findOrCreate(Team, { teamId: teamId }).then(function(team) {
        if (!team.days) team.days = {};
        var days = team.days = (team.days || {});

        if (!days[key]) days[key] = { date: key, users: {} };
        var day = days[key];

        if (!day.users[username]) day.users[username] = { count: 0, name: username };
        var user = day.users[username];

        user.count += 1;

        Team.findOneAndUpdate({ teamId: teamId }, team, function(err) {
          if (err) return reject(err);
          resolve(user);
        });
      }).catch(reject);
    });
  },
  report: function(teamId, date) {
    var key = dateKey(date);

    console.log('REPORT FOR:', key);

    return new Promise(function(resolve, reject) {
      Team.findOne({ teamId: teamId }, function(err, team) {
        if (err) return reject(err);
        if (!team || !team.days || !team.days[key]) return resolve([]);

        var users = _.values(team.days[key].users);
        resolve(users);
      });
    });
  },
  reset: function(teamId, username, date) {
    var key = dateKey(date);

    console.log('RESET FOR:', username, key);

    return new Promise(function(resolve, reject) {
      Team.findOne({ teamId: teamId }, function(err, team) {
        if (err) return reject(err);
        if (!team || !team.days || !team.days[key]) return resolve('No day for team');
        if (!team.days[key].users[username]) return resolve('No user');

        delete team.days[key].users[username];

        Team.findOneAndUpdate({ teamId: teamId }, team, function(err) {
          if (err) return reject(err);
          resolve(true);
        });
      });
    });
  }
};
