'use strict';

var expect = require('chai').expect,
	nock = require('nock'),
	helpers = require('../../../helpers/test_helpers'),
	live = require('../../../../src/lib/api/live');

var	url = 'http://www.betvictor.com/live/en/live/list.json',
	errorUrl = 'http://www.betvictor.com/live/en/live/listError.json';
describe('Live json getter', function() {

	before(function() {
		nock('http://www.betvictor.com/')
			.get('/live/en/live/list.json')
			.reply(200, helpers.loadJsonFixture('/live.json'));
		nock('http://www.betvictor.com/')
			.get('/live/en/live/listError.json')
			.reply(500);
	});

	after(function() {
		nock.cleanAll();
	});
		
	it('Should get data from api', function(done) {
		live.getData(url, function(err, response, body) {
			expect(err).to.equal(null);
			expect(body).to.be.an('object');
			expect(body.sports).to.be.an('array');
			expect(body.sports.length).to.equal(13);
			expect(body.sports[0].events.length).to.equal(6);
			expect(body.sports[0].events[0].outcomes.length).to.equal(3);
			done();
		});
	});


	it('Should throw an error if server fails', function(done) {
		live.getData(errorUrl, function(err, response, body) {
			expect(err).to.equal(null);
			expect(response.statusCode).to.equal(500);
			done();
		});	
	});
});