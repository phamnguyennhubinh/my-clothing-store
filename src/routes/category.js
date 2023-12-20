var express = require('express');
var router = express.Router();

const categoriesController = require('../app/controllers/categoryController');

router.use('/list', categoriesController.get_list);
router.post('/create', categoriesController.addCategory);
router.delete('/delete/:id', categoriesController.removeCategory);
router.put('/update', categoriesController.updateCategory);
router.use('/detail/:id',categoriesController.detail);

module.exports = router;
