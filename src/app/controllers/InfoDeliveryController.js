var InfoDelivery = require("../models/infoDelivery");
const { checkNotNull } = require("../utils/checkErrUtil");
const {
  resp,
  errors,
  success,
  notExisted,
  respFunction,
} = require("../utils/response");
const {
  validateInfoDelivery,
  infoIsExisted,
} = require("../utils/infoDeliveryUtil");

exports.getInfoDeliveryByCustomerId = async (req, res) => {
  let _errors = [];
  try {
    const info = await InfoDelivery.getByCustomerId(req.params.id);
    if (checkNotNull(info[0])) {
        respFunction(info[0],success,_errors);
    } else {
      _errors.push({ customerID: "CustomerID does not existed!" });
      respFunction([],errors[2],_errors); //this error[2] is 404 not found customerID
    }
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

exports.getInfoDeliveryByDeliveryId = async (req, res) => {
  let _errors = [];
  try {
    const info = await InfoDelivery.getByDeliveryId(req.params.id);
    if (checkNotNull(info[0])) {
      respFunction(info[0], success, _errors);
    } else {
      _errors.push({ infoDeliveryID: "infoDeliveryID does not existed!" });
      respFunction([], errors[2], _errors); //this error[2] is 404 not found infoDelivery
    }
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

exports.addInfoDelivery = async (req, res) => {
  const data = req.body;
  const result = [];
  let _errors = [];
  try {
    //get list info delivery of customerID, and compare new infoDelivery and old...
    const info = await InfoDelivery.getByCustomerId(data.customerID).catch(
      (error) => console.log(error)
    );
    //if it similar ->
    if (infoIsExisted(data, info[0])) {
      _errors.push({ infodeliver: "info delivery is existed!" });
      respFunction(result, errors[1], _errors); //this error[1] is 500
      res.send(resp);
      return;
    }
    //validate for info delivery includes name, phone,...
    _errors = await validateInfoDelivery(data).catch((error) =>
      console.log(error)
    ); //return array error

    if (_errors.length > 0) {
      respFunction(result, errors[1], _errors); //this error[1] is 500
      res.send(resp);
      return;
    }

    await InfoDelivery.create(data)
      .then((item) => result.push(item))
      .catch((error) => console.log(error));
    respFunction(result, success, _errors);
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

exports.updateInfoDelivery = async (req, res) => {
  const data = req.body;
  let result = [];
  let _errors = [];
  try {
    const infoDeliver = await InfoDelivery.getByDeliveryId(
      data.infoDeliveryID
    ).catch((error) => console.log(error));

    //check if infoDeliveryID does not existed -> errors
    if (!checkNotNull(infoDeliver[0].length)) {
      _errors.push(notExisted("infoDeliveryID"));
      respFunction(result, errors[1], _errors); //this error[1] is 500
      res.send(resp);
      return;
    }

    //check customerID & infoDelivery does existed yet?
    const existed = await InfoDelivery.checkExistedByCustomerId_DeliveryId(
      data.infoDeliveryID,
      data.customerID
    ).catch((error) => console.log(error));
    // if it existed -> error
    if (existed[0].length == 0) {
      _errors.push(notExisted("infoDeliveryID"));
      respFunction(result, errors[1], _errors); //this error[1] is 500
      res.send(resp);
      return;
    }

    //get list info delivery of customerID, and compare new infoDelivery and old...
    const info = await InfoDelivery.getByCustomerId(data.customerID).catch(
      (error) => console.log(error)
    );
    //if it similar -> error
    if (infoIsExisted(data, info[0])) {
      _errors.push({ infodeliver: "info delivery is existed!" });
      respFunction(result, errors[1], _errors); //this error[1] is 500
      res.send(resp);
      return;
    }

    //validate for info delivery includes name, phone,...
    _errors = await validateInfoDelivery(data); //return array error

    if (_errors.length > 0) {
      respFunction(result, errors[1], _errors); //this error[1] is 500
      res.send(resp);
      return;
    }
    //if nothing have problem -> update
    await InfoDelivery.update(data)
      .then((item) => result.push(item))
      .catch((error) => console.log(error));
    respFunction(result, success, _errors);
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

exports.removeInfoDeliveryById = async (req, res) => {
    let _errors = [];
    let result = [];
    try {
        const info = await InfoDelivery.getByDeliveryId(req.params.id).catch(error => console.log(error));
        if(info[0].length == 0){
            _errors.push(notExisted("infoDeliveryID"));
            respFunction(result,errors[2],_errors); //this error is 404 not found infoDeliveryID
            res.send(resp);
            return;
        }
        await InfoDelivery.remove(req.params.id).catch(error => console.log(error));
        respFunction(result,success,_errors);
        res.send(resp);
    } catch (error) {
        throw error;
    }
    
}
