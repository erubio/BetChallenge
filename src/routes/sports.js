'use strict';

var express = require('express');
var sportRouter = express.Router();
var sportsCtrl = require('../controllers/sportsController');

/**/
sportRouter.get('/', sportsCtrl.sports);

/* GET  */
sportRouter.get('/:sportId', sportsCtrl.sport);

sportRouter.get('/:sportId/events/:eventId', sportsCtrl.event);

sportRouter.get('/:sportId/events/:eventId/outcomes', sportsCtrl.outcomes);

module.exports = sportRouter;
