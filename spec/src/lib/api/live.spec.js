'use strict';

var expect = require('chai').expect,
	nock = require('nock'),
	helpers = require('../../../helpers/test_helpers'),
	live = require('../../../../src/lib/api/live');

describe('Live json getter', function() {

	before(function() {
		nock('http://www.betvictor.com/')
			.get('/live/en/live/list.json')
			.reply(200, helpers.loadJsonFixture('/live.json'));
	});

	after(function() {
		nock.cleanAll();
	});
		
	it('Should get data from api', function(done) {
		live.getData(function(err, response, body) {
			expect(err).to.equal(null);
			expect(body).to.be.an('object');
			expect(body.sports).to.be.an('array');
			expect(body.sports.length).to.equal(13);
			expect(body.sports[0].events.length).to.equal(6);
			expect(body.sports[0].events[0].outcomes.length).to.equal(3);
			done();
		});
	});
});