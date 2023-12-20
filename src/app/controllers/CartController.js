const CartDetail = require("../models/cart");
const Cart = require("../models/carts");
const Products = require("../models/products");
const {
  resp,
  success,
  errors,
  respFunction,
  notExisted,
} = require("../utils/response");
const { checkNotNull } = require("../utils/checkErrUtil");
const Customers = require("../models/customers");
const {formatPrice} = require('../utils/productUtil');

exports.getCartIdByCustomerId = async (req, res) => {
  let result = [];
  let _errors = [];
  let cartId = await Cart.getCartId(req.params.id);
  console.log("cartId: ", cartId);
  if (cartId == null || cartId == undefined) {
    const arr = await Cart.create(Number(req.params.id));
    cartId = arr.cartID;
  }
  result.push({ cartID: cartId });
  respFunction(result, success, _errors);
  res.send(resp);
};

exports.getListItemInCart = async (req, res) => {
  let _errors = [];
  console.log(req.params.id);
  const arr = await CartDetail.getCartByCartId(req.params.id);
  respFunction(arr[0], success, _errors);
  res.send(resp);
};

exports.removeItemInCart = async (req, res) => {
  let result = [];
  let _errors = [];
  await CartDetail.removeCartByProductId(req.query);
  respFunction(result, success, _errors);
  res.send(resp);
};

exports.addItemToCart = async (req, res) => {
  //arr is a array, its contain quantity
  let result = [];
  let _errors = [];
  let status = Number;
  let newQuantity = req.query.quantity;
  const cartId = req.query.cartId;
  const productId = req.query.productId;
  const checkCartId = await Cart.checkExistedCartId(cartId).catch((error) =>
    console.log(error)
  );
  if (!checkCartId) {
    _errors.push({ cartID: `cartID = ${cartId} does not existed!` });
    respFunction(result, errors[2], _errors); //this error is 404
    res.send(resp);
    return;
  }
  try {
    const arr = await CartDetail.checkExistedItemInCart(req.query);
    if (arr?.length > 0) {
      newQuantity = parseInt(newQuantity) + parseInt(arr[0].quantity);
      console.log(newQuantity);
      status = await CartDetail.updateItemInCart(
        cartId,
        productId,
        newQuantity
      );
      result.push({
        cartID: cartId,
        productID: productId,
        quantity: newQuantity,
      });
      respFunction(result, status, _errors);
      res.send(resp);
    } else {
      result.push({
        cartID: cartId,
        productID: productId,
        quantity: newQuantity,
      });
      result = await CartDetail.create(req.query);
      respFunction(result, success, _errors);
      res.send(resp);
    }
  } catch (error) {
    console.error("Error in transaction:", error);
    throw error;
  }
};

exports.getListCustomerCart = async (req, res) => {
  let _errors = [];
  try {
    const customerId = await Customers.getCustomerById(req.params.id);
    if (customerId[0].length == 0) {
      _errors.push(notExisted("customerID"));
      respFunction([], errors[2], _errors);
      res.send(resp);
      return;
    }
    const cartID = await Cart.getCartId(req.params.id); //customerID
    if (!checkNotNull(cartID)) {
      _errors.push(notExisted("customerID"));
      respFunction([], errors[2], _errors);
      res.send(resp);
    }
    const listCart = await CartDetail.getCartByCartId(cartID);
    let result = [];
    for (let i = 0; i < listCart.length; i++) {
      const arr = await Products.getById(listCart[i].productID);
      const listImage = await Products.getImageByProductId(
        listCart[i].productID
      );
      const array = arr[0];
      const kq = {
        id: array.id,
        name: array.name,
        price: formatPrice(array.price),
        quantity: listCart[i].quantity,
        pic: listImage,
      };
      result.push(kq);
    }
    respFunction(result, success, []);
    res.send(resp);
  } catch (error) {
    throw error;
  }
};
