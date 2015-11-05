var mongoose = require('mongoose');

module.exports = {
  connect: function() {
    mongoose.connect(process.env.MONGOLAB_URI);
  },
  Team: mongoose.model('Team', new mongoose.Schema({
    teamId: 'string',
    days: 'object',
  })),
  findOrCreate: function(model, query) {
    return new Promise(function(resolve, reject) {
      model.findOne(query, function(err, result) {
        if (err) return reject(err);

        if (!result) {
          return model.create(query, function(err, result) {
            if (err) return reject(err);
            resolve(result);
          });
        }

        resolve(result);
      });
    });
  },
};
