var express = require('express');
var router = express.Router();

const infoDeliveryController = require('../app/controllers/InfoDeliveryController');

router.get('/info/:id', infoDeliveryController.getInfoDeliveryByCustomerId);
router.get('/info/deliveryId/:id', infoDeliveryController.getInfoDeliveryByDeliveryId);
router.post('/add', infoDeliveryController.addInfoDelivery);
router.put('/update', infoDeliveryController.updateInfoDelivery);
router.delete('/delete/:id', infoDeliveryController.removeInfoDeliveryById);

module.exports = router;
