var express = require('express');
var router = express.Router();

const cartController = require('../app/controllers/CartController');

//get cartId by CustomerId
router.get('/getCartId/:id', cartController.getCartIdByCustomerId);
//get list item cart by cartID
router.get('/list/:id', cartController.getListItemInCart);
//if u want to remove, u should ?cartId= &productId=
router.delete('/remove', cartController.removeItemInCart);
//if u want to add-item, u should ?cartId=...&productId=...&quantity=...
router.post('/add-item', cartController.addItemToCart);
router.get('/customer-cart/:id', cartController.getListCustomerCart);

module.exports = router;
