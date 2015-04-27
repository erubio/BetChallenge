'use strict';

var expect = require('chai').expect,
	nock = require('nock'), 
	sportsController = require('../../../src/controllers/sportsController'),
	helpers = require('../../helpers/test_helpers'),
	httpMocks = require('node-mocks-http'),
	handler = sportsController.sports,
	req, res;

describe('Sports Controller', function() {
	describe('sports handler', function(){
		beforeEach(function(){
			nock('http://www.betvictor.com/')
				.get('/live/en/live/list.json')
				.reply(200, helpers.loadJsonFixture('/live.json'));
			req = httpMocks.createRequest({
				method: 'GET',
				url: '/sports'
			});
			res = httpMocks.createResponse();
		});


		it('should render correct view with correct params', function(done) {
			handler(req, res);
			setTimeout(function(){
				var data = res._getRenderData();
				expect(res._getRenderView()).to.equal('sports');
				expect(data).to.be.an('object');
				expect(data.sports).to.be.an('array');
				done();	
			}, 10);
			
		});
	
	});


});