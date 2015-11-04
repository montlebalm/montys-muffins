var _ = require('lodash');
var moment = require('moment');

module.exports = function(text) {
  var date;

  switch (text) {
    case 'today':
      date = moment().toDate();
      break;
    case 'yesterday':
      date = moment().add(-1, 'day').toDate();
      break;
    case 'tomorrow':
      date = moment().add(1, 'day').toDate();
      break;
    default:
      var dateMoment = moment(text);
      if (dateMoment.isValid()) {
        date = dateMoment.toDate();
      }
      break;
  }

  return date;
};
