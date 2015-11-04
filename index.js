var express = require('express');
var bodyParser = require('body-parser');

var slackReply = require('./src/middleware/slackReply');
var AuthController = require('./src/controllers/auth');
var FlushController = require('./src/controllers/flush');
var PoopinController = require('./src/controllers/poopin');
var WhoPoopedController = require('./src/controllers/whopooped');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(slackReply);
app.get('/auth', AuthController);
app.post('/poopin', PoopinController);
app.post('/whopooped', WhoPoopedController);
app.post('/flush', FlushController);

var server = app.listen(process.env.PORT || 5000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
