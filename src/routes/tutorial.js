var express = require('express');
var router = express.Router();

const tutorialController = require('../app/controllers/tutorial.controller');

router.use('/:id', tutorialController.findOne);
// router.use('/', siteController.index);

module.exports = router;

