'use strict';

var sportsRouter = require('./sports');

module.exports.configure = function(app) {
	app.use('/', function(req, res) {
		res.render('index');
	});
};