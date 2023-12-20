var Customers = require("../models/customers");
var Cart = require("../models/carts");
var InfoDelivery  = require('../models/infoDelivery');
// const mysql = require('mysql2/promise');
const pool = require("../models/db");
const { checkValidate } = require("../utils/customerFunc");
const { resp, errors, success, respFunction } = require("../utils/response");
const { checkNotNull } = require("../utils/checkErrUtil");
const {removeWhenCustomerRemoved} = require('../utils/infoDeliveryUtil');
const CartDetail = require("../models/cart");

exports.getListCustomers = async function (req, res) {
  try {
    await Customers.getAllCustomer()
      .then((data) => (resp.result = data[0]))
      .catch((err) => console.log(err));
    console.log("hello", resp.result);
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

exports.getDetailCustomer = async function (req, res) {
  try {
    let _errors = [];
    const existedCustomer = 
    await Customers.getCustomerById(req.params.id);
    if(!checkNotNull(existedCustomer[0]))
    {
      _errors.push({customerID: "CustomerID does not existed!"});
      resp.result = [];
      resp.errors = _errors;
      resp.statusCode = errors[2];
    }
    else
    {
      resp.result = existedCustomer[0];
      resp.errors = [];
      resp.statusCode = success;
    }
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

exports.loginAccount = async function (req, res) {
  console.log(req.query.username);
  console.log(req.query.password);
  resp.result = [];
  let _errors = [];
  try {
    const response = await Customers.login(req.query.username,req.query.password);
    console.log("This is response...", response)
    resp.statusCode = response;
    switch (response) {
      case 403:
        _errors.push({ password: "password incorrect!" });
        break;
      case 401:
        _errors.push({ phone: "account is not register yet!" });
        break;
      default:
        resp.statusCode = 200;
        try {
          // resp.result = await Customers.getInfoDeliveryAndCartById(response);
          // resp.result.push({customerID: response});
          // const cartID = await 
          resp.result.push({customerID: response});
          console.log(resp.result);
        } catch (error) {
          console.error("Error while getting info and cart:", error);
          _errors.push({
            general: "An error occurred while getting info and cart.",
          });
          resp.statusCode = errors[1]; //this error is 500
        }
        break;
    }
    resp.errors = _errors;
    res.send(resp);
  } catch (error) {
    throw error;
  }
  
};

exports.addCustomer = async function (req, res) {
  var data = req.body;
  let _errors = [];
  const connection = await pool.getConnection();
  try {
    _errors = await checkValidate(data, req, res);
  } catch (error) {
    console.error("This is an error in checkValidate: ", error);
  }
  try {
    const accExisted = await Customers.checkRegister(data.phone);
    if (accExisted > 0) {
      _errors.push({
        phone: "phone is existed!",
      });
    }
  } catch (error) {
    console.error("This is an error in Customer.checkRegisted: ", error);
  }
  if (_errors?.length > 0) {
    resp.statusCode = 403;
    resp.errors = _errors;
    res.send(resp);
    return;
  }
  try {
    await connection.beginTransaction();
    await Customers.create(data)
      .then((res) => (resp.result = res))
      .catch((error) => console.log(error));
    await Cart.create(resp.result.id).catch((error) => console.log(error));
    await connection.commit();
    connection.release();
    resp.errors = [];
    res.send(resp);
  } catch (error) {
    await connection.rollback();
    console.error("Processing have an error:", error);
    res.status(500).send("Processing was rollback because it have an error!");
  }
};

exports.removeCustomer = async function (req, res) {
  const id = parseInt(req.params.id);
  const connection = await pool.getConnection();
  try {

    await connection.beginTransaction();

    const listInfoDelivery = await InfoDelivery.getByCustomerId(id);
    const list = listInfoDelivery[0];
    for(let i=0; i<list.length; i++){
      await InfoDelivery.remove(list[i].infoDeliveryID);
    }

    await CartDetail.removeWhenCartInCarts(id);

    await Cart.remove(id);

    await Customers.remove(id);

    await connection.commit();
    connection.release();
    respFunction([], success,[]);
    res.send(resp);
  } catch (error) {
    await connection.rollback();
    respFunction([],errors[1],[]); //this error is 500
    console.error("This error in processing:", error);
    res.status(500).send("Processing was rollback transaction because it have an error...");
  }
};

exports.updateCustomer = async function (req, res) {
  var data = req.body;
  let _errors = [];
  try {
    _errors = await checkValidate(data, req, res);
    const check = await Customers.checkRegister(data.phone);
    const findId = await Customers.findIdByPhone(data.phone);
    if (check >= 2 || (findId != null && findId != data.customerID)) {
      _errors.push({
        phone: "Phone is existed before!",
      });
    }
    if (_errors?.length > 0) {
      resp.result = [];
      resp.statusCode = errors[0]; //this errors is 403
      resp.errors = _errors;
      res.send(resp);
      return;
    }

    await Customers.update(data)
      .then((res) => (resp.result = res))
      .catch((error) => console.log(error));

    res.send(resp);
  } catch (error) {
    throw error;
  }
};
