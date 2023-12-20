var express = require('express');
var router = express.Router();

const SettingController = require('../app/controllers/SettingController');
const FeedbackController = require('../app/controllers/FeedbackController');
const SectionControler = require('../app/controllers/SectionController');

router.get('/sections/:id', SectionControler.getSectionById);
router.get('/feedback', FeedbackController.getFeedbacks);
router.get('/feedback/:id', FeedbackController.getFeedbackById);
router.get('/slide', SectionControler.getShowSlide);
router.get('/:name', SettingController.getSettingByName);


module.exports = router;