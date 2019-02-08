console.log('index.js executing');

var express = require('express');
var status = require('http-status');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.post('/', function(req, res) {
	res.sendStatus(status.METHOD_NOT_ALLOWED);
});

var port = 3000;
app.listen(port,function() {
	console.log('Listening on port ' + port);
});
