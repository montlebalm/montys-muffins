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
    res.sendStatus(200);
  };

  res.privateReply = function(txt) {
    postToResponseUrl(responseUrl, {
      text: txt,
    });
    res.sendStatus(200);
  };

  res.errorReply = function(err) {
    postToResponseUrl(responseUrl, {
      text: 'The server pooped (' + err + ')',
    });
    res.sendStatus(200);
  };

  next();
};
