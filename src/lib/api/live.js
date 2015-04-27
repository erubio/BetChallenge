'use strict';

var request = require('request'),
	url = 'http://www.betvictor.com/live/en/live/list.json';

module.exports.getData = function(callback) {
	request({url: url, json: true}, function (error, response, body) {
		callback(error, response, body);
	});
};


