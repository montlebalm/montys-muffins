var express = require('express');

var AuthController = require('./src/controllers/auth');
var PoopinController = require('./src/controllers/poopin');

var app = express();
app.get('/auth', AuthController);
app.post('/poopin', PoopinController);

var server = app.listen(process.env.PORT || 5000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
