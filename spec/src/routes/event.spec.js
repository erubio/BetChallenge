'use strict';

var expect = require('chai').expect,
	nock = require('nock'), 
	sportsController = require('../../../src/controllers/sportsController'),
	helpers = require('../../helpers/test_helpers'),
	httpMocks = require('node-mocks-http'),
	handler = sportsController.event,
	req, res;

describe('Sports Controller', function() {
	describe('event handler', function(){
		beforeEach(function(){
			nock('http://www.betvictor.com/')
				.get('/live/en/live/list.json')
				.reply(200, helpers.loadJsonFixture('/live.json'));
			req = httpMocks.createRequest({
				method: 'GET',
				url: '/sport/100/event/270558510',
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
				expect(res._getRenderView()).to.equal('event');
				expect(data).to.be.an('object');
				expect(data.event).to.be.an('object');
				done();	
			}, 10);
			
		});
	
	});
	describe('sports error handler', function(){
		beforeEach(function(){
			nock('http://www.betvictor.com/')
				.get('/live/en/live/list.json')
				.reply(500, {statusCode: 500});
			req = httpMocks.createRequest({
				method: 'GET',
				url: '/sport/100',
				params: {
					sportId: '100'	
				}
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