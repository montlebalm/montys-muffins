var request = require('request');

function postToResponseUrl(url, data) {
  request({
    body: data,
    json: true,
    method: 'post',
    url: url,
  });
}

module.exports = function(req, res, next) {
  var responseUrl = req.body.response_url;

  res.publicReply = function(txt) {
    postToResponseUrl(responseUrl, {
      response_type: 'in_channel',
      text: txt,
    });
    res.json({
      response_type: 'in_channel',
    });
  };

  res.privateReply = function(txt) {
    postToResponseUrl(responseUrl, {
      response_type: 'ephemeral',
      text: txt,
    });
    res.json({
      response_type: 'ephemeral',
    });
  };

  res.errorReply = function(err) {
    res.privateReply('The server pooped (' + err + ')');
  };

  next();
};
