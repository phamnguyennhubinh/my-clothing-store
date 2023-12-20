var express = require('express');
var router = express.Router();

const ProductController = require('../app/controllers/ProductController');

router.get('/list', ProductController.getListProducts);
router.get('/pagination', ProductController.getListProductsByPage);
router.get('/:id', ProductController.getProductById);

module.exports = router;