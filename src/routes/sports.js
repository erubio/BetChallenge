'use strict';

var express = require('express');
var sportRouter = express.Router();
var sportsCtrl = require('../controllers/sportsController');

/**/
sportRouter.get('/', sportsCtrl.sports);

/* GET  */
sportRouter.get('/:sportId', sportsCtrl.sport);

/* GET */
sportRouter.get('/:sportId/events', sportsCtrl.events);


sportRouter.get('/:sportId/events/:eventId', sportsCtrl.event);

module.exports = sportRouter;
