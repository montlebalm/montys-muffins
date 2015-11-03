module.exports = function(date) {
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ].join('-');
};
