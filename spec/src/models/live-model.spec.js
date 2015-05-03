'use strict';

var expect = require('chai').expect,
	nock = require('nock'), 
	liveM = require('../../../src/models/live'),
	helpers = require('../../helpers/test_helpers'),
	options = helpers.loadJsonFixture('/live.json'),
	live = new liveM.LiveModel(options),
	sport = live.getSport(100), 
	evnt = sport.getEvent(270558510);

describe('Models', function() {
	describe('Live Model', function(){
		it('should create object', function(done) {
			expect(live.version).to.equal("77436098770002_525065c3c_en_2_1");
			expect(live.sports.length).to.equal(13);
			expect(live.sports[0]).to.have.keys(['events', 'id', 'is_virtual', 'pos', 'title', 'meetings']);
			expect(live.sports[0].events.length).to.equal(6);
			expect(live.sports[0].events[0]).to.have.keys(['american_format','away_score','away_team','description','event_id','event_type','home_score','home_team','id','is_virtual','market_id','market_type_id','media','meeting','meeting_id','outcomes','period_id','pos','score','start_time','status','status_id','status_type','team_information','title','total_outcomes']);
			expect(live.sports[0].events[0].outcomes.length).to.equal(3);
			expect(live.sports[0].events[0].outcomes[0]).to.have.keys(['deduction','description','id','market','nr','opponent_id','price','price_decimal','price_id','print_order','sp']);
			done();
		});

		it('should return sport by id', function(done) {
			var sport = live.getSport(100);
			expect(sport.id).to.equal(100);
			done();
		});

		it('should return null if sport doesnt exists', function(done) {
			var sport = live.getSport(100333);
			expect(sport).to.equal(null);
			done();
		});

		it('should return sorted sports', function(done) {
			var sports = live.getSortedSports();
			expect(sports[0].id).to.equal(100);
			expect(sports[1].id).to.equal(600);
			expect(sports[2].id).to.equal(364700);
			expect(sports[3].id).to.equal(601600);
			expect(sports[4].id).to.equal(433100);
			expect(sports[5].id).to.equal(2100);
			expect(sports[6].id).to.equal(20000);
			expect(sports[7].id).to.equal(20100);
			expect(sports[8].id).to.equal(20400);
			expect(sports[9].id).to.equal(20600);
			expect(sports[10].id).to.equal(20300);
			expect(sports[11].id).to.equal(20200);
			expect(sports[12].id).to.equal(20500);
			done();
		});
	
	});

	describe('Sport Model', function(){
		
		it('should return sorted events', function(done) {
			var events = sport.getSortedEvents();
			expect(events[0].id).to.equal(270558510);
			expect(events[1].id).to.equal(271249010);
			expect(events[2].id).to.equal(270988210);
			expect(events[3].id).to.equal(15068110);
			expect(events[4].id).to.equal(59989010);
			expect(events[5].id).to.equal(270829010);
			done();
		});

		it('should return event by id', function(done) {
			var evt = sport.getEvent(270558510);
			expect(evt.id).to.equal(270558510);
			done();
		});
	
	});

	describe('Event Model', function(){


		it('should return sorted outcomes(original result because dont have pos property)', function(done) {
			var outcomes = evnt.getSortedOutcomes();
			expect(outcomes[0].id).to.equal(28002435800);
			expect(outcomes[1].id).to.equal(28002436000);
			expect(outcomes[2].id).to.equal(28002435900);
			done();
		});

		it('should return outcome by id', function(done) {
			var outcome = evnt.getOutcome(28002435800);
			expect(outcome.id).to.equal(28002435800);
			done();
		});
	
	});

});