const { checkNotNull } = require("../utils/checkErrUtil");
const InfoDelivery = require('../models/infoDelivery');
const {isRequired, isInvalid, notExisted} = require('../utils/response');
const {
  validateName,
  validatePhoneNumber,
  checkValidate,
} = require("../utils/customerFunc");

const validateInfoDelivery = async (data) => {
  let _errors = [];
  const validate_name = validateName(data.name);
  const validate_phone = validatePhoneNumber(data.phone);
  if (checkNotNull(validate_name)) {
    _errors.push(validate_name);
  }
  if (checkNotNull(validate_phone)) {
    _errors.push(validate_phone);
  }
  if (!checkNotNull(data.city)) {
    _errors.push(isRequired("city"));
  }
  if (!checkNotNull(data.district)) {
    _errors.push(isRequired("district"));
  }
  if (!checkNotNull(data.ward)) {
    _errors.push(isRequired("ward"));
  }
  if (!checkNotNull(data.specificAddress)) {
    _errors.push(isRequired("specificAddress"));
  }
  return _errors;
};

const infoIsExisted = (data, info) => {
  for (let i = 0; i < info.length; i++) {
    if (
      (data.customerID ==
        info[i].customerID &&
        data.name == info[i].name &&
        data.phone == info[i].phone &&
        data.city == info[i].city &&
        data.district == info[i].district &&
        data.ward == info[i].ward &&
        data.specificAddress == info[i].specificAddress)
    ) {
      return true;
    }
  }
  return false;
};

const removeWhenCustomerRemoved = async (customerID) => {
    const listInfoDelivery = await InfoDelivery.getByCustomerId(customerID);
    const list = listInfoDelivery[0];
    for(let i=0; i<list.length; i++){
        await InfoDelivery.remove(list[i].infoDeliveryID);
    }
}

module.exports = { validateInfoDelivery, infoIsExisted, removeWhenCustomerRemoved };
