var live = require('../lib/api/live');

/*
* Handler to show sports
*/
module.exports.sports = function(req, res, next) {
	live.getData(function(err, response, live) {
		if(err) {
			next();
		} else {
			res.render('sports', {
				sports: live.getSortedSports()
			});
		}
	});
};

/*
* Handler to show sport id
*/
module.exports.sport = function(req, res, next) {
	live.getData(function(err, response, live) {
		if(err) {
			next();
		} else {
			var sportId = parseInt(req.params.sportId, 10);
			res.render('sport', {
				sport: live.getSport(sportId)
			});
		}
	});
};

/*
* Handler to show event by id
*/
module.exports.event = function(req, res, next) {
	live.getData(function(err, response, live) {
		if(err) {
			next();
		} else {
			var sportId = parseInt(req.params.sportId, 10),
				eventId = parseInt(req.params.eventId, 10),
				sport = live.getSport(sportId);
			res.render('event', {
				event: sport.getEvent(eventId)
			});
		}
	});

};

/*
* Handler to show outcomes
*/
module.exports.outcomes = function(req, res, next) {
	live.getData(function(err, response, live) {
		if(err) {
			next();
		} else {
			var sportId = parseInt(req.params.sportId, 10),
				eventId = parseInt(req.params.eventId, 10),
				sport = live.getSport(sportId),
				event = sport.getEvent(eventId);
			res.render('outcomes', {
				outcomes: event.getSortedOutcomes()
			});
		}
	});
};