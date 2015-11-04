var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

var schema = new mongoose.Schema({
  users: 'array',
  date: 'string'
});

module.exports = mongoose.model('Day', schema);
