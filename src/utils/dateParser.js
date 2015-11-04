var moment = require('moment');

module.exports = function(text) {
  switch (text) {
    case 'today':
      return moment().toDate();
    case 'yesterday':
      return moment().add(-1, 'day').toDate();
    case 'tomorrow':
      return moment().add(1, 'day').toDate();
    default:
      var dateMoment = moment(text);
      if (dateMoment.isValid()) {
        return dateMoment.toDate();
      }
  }
};
