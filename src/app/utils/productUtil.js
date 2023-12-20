// const { productID } = require("../models/products");
var Products = require('../models/products');
const {notExisted, errors} = require('../utils/response');

const setResponseProduct = async (productID) => {
    let _errors = [];
    const arr = await Products.getById(productID);
    if (arr.length == 0) {
      _errors.push(notExisted("productID"));
      respFunction([], errors[2], _errors); //this error is 404 not found productID
      res.send(resp);
      return;
    }
    const listImage = await Products.getImageByProductId(productID);
    result = arr.map((product) => ({
      ...product,
      pic: listImage,
    }));
};

// Hàm định dạng giá
function formatPrice(price) {
    // Chuyển đổi chuỗi giá thành số và sau đó định dạng theo một định dạng mong muốn
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\.00$/, ''); // Loại bỏ các số 0 sau dấu chấm
  }

module.exports = {formatPrice};