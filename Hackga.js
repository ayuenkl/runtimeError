var express = require('express');

var server = express();

server.use(function (req, res, next) {
	console.log(req.originalUrl);
	next();
}, express.static('./'));

server.listen(3000, function () {
	console.log('Server is running...');
})