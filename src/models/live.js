'use strict';

/*
* Function that copy options to object
* @param {Object} obj -> Object to create
* @param {object} options -> JSON with key values
*/
function assignKeys(obj, options) {
	for(var key in options) {
		obj[key] = options[key];
	}	
}

/*
* Function that order the array based on pos property
* @param {Array} array -> Array to order
* @return {Array} sorted array 
*/
function orderByPos(array) {
	return array.sort(function(a,b){
		if(a.pos > b.pos) {
			return 1;
		} else if(a.pos < b.pos) {
			return -1;
		} else {
			return 0;
		}
	});
}

/*
* Function that order the array based on pos property
* @param {Array} array -> Array to order
* @param {Number} id -> Element id
* @return {Object} -> obeject of the array or null
*/
function getById(array, id) {
	var obj = array.filter(function(a) {
		return a.id === id;
	});
	if(obj && obj.length) {
		return obj[0];
	} else {
		return null;
	}	
}

/*
* Sport object
*/
function Sport(options) {
	var events = [];
	assignKeys(this, options);
	options.events.forEach(function(event) {
		events.push(new Event(event));
	});
	this.events = events;
}
/*
* Event object
*/
function Event(options){
	var outcomes = [];
	assignKeys(this, options);
	options.outcomes.forEach(function(outcome){
		outcomes.push(new Outcome(outcome));
	});
}

/*
* Outcome object
*/
function Outcome(options) {
	for(var key in options) {
		this[key] = options[key];
	}	
}

/*
* Lve object
*/
function Live(options) {
	var sports = [];
	this.version = options.version;
	options.sports.forEach(function(sport){
		sports.push(new Sport(sport));
	});
	this.sports = sports;
}

/*
* Objects prototypes
*/
Live.prototype.getSortedSports = function(){
	return orderByPos(this.sports);
};
Live.prototype.getSport = function(id){
	return getById(this.sports, id);
};

Sport.prototype.getSortedEvents = function() {
	return orderByPos(this.events);
};

Sport.prototype.getEvent = function(id) {
	return getById(this.events, id);
};

Event.prototype.getSortedOutcomes = function() {
	return orderByPos(this.outcomes);
};

Event.prototype.getOutcome = function(id) {
	return getById(this.outcomes, id);
};

module.exports.LiveModel = Live;
