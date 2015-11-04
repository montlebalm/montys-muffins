module.exports = function(req, res, next) {
  res.publicReply = function(txt) {
    res.json({
      response_type: 'in_channel',
      text: txt,
    });
  };

  res.privateReply = function(txt) {
    res.json({
      text: txt,
    });
  };

  res.errorReply = function(err) {
    res.json({
      text: 'The server pooped (' + err + ')',
    });
  };

  next();
};
