'use strict';

var expect = require('chai').expect,
	nock = require('nock'), 
	sportsController = require('../../../src/controllers/sportsController'),
	helpers = require('../../helpers/test_helpers'),
	httpMocks = require('node-mocks-http'),
	handler = sportsController.outcomes,
	req, res;

describe('Sports Controller', function() {
	describe('Outcomes handler', function(){
		beforeEach(function(){
			nock('http://www.betvictor.com/')
				.get('/live/en/live/list.json')
				.reply(200, helpers.loadJsonFixture('/live.json'));
			req = httpMocks.createRequest({
				method: 'GET',
				url: '/sport/100/event/270558510/outcomes',
				params: {
					sportId: '100',
					eventId: '270558510'
				}
			});
			res = httpMocks.createResponse();
		});


		it('should render correct view with correct params', function(done) {
			handler(req, res);
			setTimeout(function(){
				var data = res._getRenderData();
				expect(res._getRenderView()).to.equal('outcomes');
				expect(data).to.be.an('object');
				expect(data.outcomes).to.be.an('array');
				done();	
			}, 10);
			
		});
	
	});
	describe('Outcomes error handler', function(){
		beforeEach(function(){
			nock('http://www.betvictor.com/')
				.get('/live/en/live/list.json')
				.reply(500, {statusCode: 500});
			req = httpMocks.createRequest({
				method: 'GET',
				url: '/sports'
			});
			res = httpMocks.createResponse();
		});


		it('should call next', function(done) {
			handler(req, res, function(){
				expect(true).to.equal(true);
				done();
			});
			
		});
	
	});


});