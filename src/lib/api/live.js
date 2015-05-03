'use strict';

var request = require('request'),
	live = require('../../models/live'),
	url = 'http://www.betvictor.com/live/en/live/list.json';


module.exports.getData = function(callback) {
	var liveObj;
	request({url: url, json: true}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			liveObj = new live.LiveModel(body);;
			callback(error, response, liveObj);
		} else {
			callback(true, response, body);
		}
	});
};
