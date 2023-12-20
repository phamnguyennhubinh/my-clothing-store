const Products = require("../models/products");
const {
  respFunction,
  resp,
  errors,
  success,
  notExisted,
} = require("../utils/response");
const { checkNotNull } = require("../utils/checkErrUtil");
const {formatPrice} = require('../utils/productUtil');

exports.getListProducts = async (req, res) => {
  let result = [];
  try {
    result = await Products.getList();
    respFunction(result, success, []);
    res.send(resp);
  } catch (error) {
    respFunction(result, errors[1], []);
    throw error;
  }
};

exports.getListProductsByPage = async (req, res) => {
  const data = req.query;
  let result = [];
  try {
    result = await Products.getProductByPage(data.limit, data.page);
    for (let i = 0; i < result.length; i++) {
      const list = await Products.getImageByProductId(result[i].id);
      result[i].pic = list;
      result[i].price = formatPrice(result[i].price);
    }
    respFunction(result, success, []);
    res.send(resp);
  } catch (error) {
    respFunction([], errors[1], []); //this error is 500
    res.send(resp);
    throw error;
  }
};

exports.getProductById = async (req, res) => {
  let result;
  let _errors = [];
  try {
    const arr = await Products.getById(req.params.id);
    if (arr.length == 0) {
      _errors.push(notExisted("productID"));
      respFunction([], errors[2], _errors); //this error is 404 not found productID
      res.send(resp);
      return;
    }
    const listImage = await Products.getImageByProductId(req.params.id);
    result = arr.map((product) => ({
      ...product,
      pic: listImage,
    }));
    respFunction(result, success, []);
    res.send(resp);
  } catch (error) {
    throw error;
  }
};
