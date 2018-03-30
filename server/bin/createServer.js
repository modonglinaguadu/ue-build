var express = require('express');
var app = express();
var path = require('path');
var handleParams = require('./handleParams');

//constant
var por = 3030;

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/msg', function(req, res) {
	//deal with arguments
	handleParams(req).then(function(result) {
		res.send(result);
		console.log('done!');
		process.exit(0);
	}).catch(function(result) {
		res.send(result);
	});
});

var server = app.listen(por, function() {
	var host = 'localhost';
	var port = server.address().port;

	console.log('create project app listening at http://%s:%s/create.html', host, port);
});

module.exports = server;