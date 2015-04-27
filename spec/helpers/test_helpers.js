var fs = require('fs'),
	path = require('path');

var cache = {};

module.exports.loadJsonFixture = function loadJsonFixture(fixturePath) {
	var content = cache[fixturePath];
	if (!content) {
		content = JSON.parse(fs.readFileSync(path.join(__dirname, '../fixtures', fixturePath), 'utf8'));
	}	
	return content;
};