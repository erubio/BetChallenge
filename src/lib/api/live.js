'use strict';

var request = require('request');

module.exports.getData = function(url, callback) {
	request({url: url, json: true}, function (error, response, body) {
		callback(error, response, body);
	});
};
