var express = require('express');
var router = express.Router();

// const categoriesController = require('../app/controllers/categoryController');
const customerController = require('../app/controllers/CustomerController');



router.use('/all', customerController.getListCustomers);
router.post('/create', customerController.addCustomer);
router.put('/update', customerController.updateCustomer);
router.get('/login', customerController.loginAccount);
router.delete('/delete/:id', customerController.removeCustomer);
router.use('/:id', customerController.getDetailCustomer);

module.exports = router;
