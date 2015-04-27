var live = require('../lib/api/live');

module.exports.sports = function(req, res, next) {
	live.getData(function(err, response, body) {
		if(err) {
			next();
		} else {
			res.render('sports', {
				sports: body.sports
			});	
		}
	});
		

};

module.exports.sport = function(req, res, next) {
	res.json({});	

};

module.exports.events = function(req, res, next) {
	res.json({});	

};

module.exports.event = function(req, res, next) {
	res.json({});	

};

module.exports.outcome = function(req, res, next) {
	res.json({});
};