var Customers = require("../models/customers");
const { resp } = require("../utils/response");
const bcrypt = require("bcrypt");
const { checkNotNull } = require("./checkErrUtil");

const birthdayPattern = /^\d{4}-\d{2}-\d{2}$/;
const namePattern = /^[A-Za-zÀ-ỹ\s']+$/;
const phonePattern = /^(0[2-9][0-9]{8}|[2-9][0-9]{8})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

const checkValidate = async (data, req, res) => {
  let _errors = [];
  const validate_name = validateName(data.name);
  if(checkNotNull(validate_name))
  {
     _errors.push(validate_name);
  }
  if (data.hashed_password == "") {
    _errors.push({
      password: "password is required!",
    });
  } else if (!passwordRegex.test(data.hashed_password)) {
    _errors.push({
      hashed_password:
        "Password must be strong: at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  } else {
    try {
      const hashedPassword = await hashPassword(data.hashed_password);
      data.hashed_password = hashedPassword;
    } catch (error) {
      console.error("Lỗi khi hash mật khẩu:", error);
    }
  }

  if (!birthdayPattern.test(data.birthday)) {
    _errors.push({
      birthday: "Birthday is invalid format yyyy-mm-dd!",
    });
  }
  const validate_phone = validatePhoneNumber(data.phone);
  if(checkNotNull(validate_phone))
  {
     _errors.push(validate_phone);
  }
  if (data.email == "") {
    _errors.push({
      email: "Email is required!",
    });
  } else if (!emailPattern.test(data.email)) {
    _errors.push({
      email: "Email is invalid!",
    });
  }
  return _errors;
};

const validateName = (name) => {
  let _errors = null;
  if (name == "" || name == null || name == undefined) {
    _errors = {
      name: "Name is required!",
    };
  } else if (!namePattern.test(name)) {
    _errors = {
      name: "Name is invalid!",
    };
  }
  return _errors;
};

const validatePhoneNumber = (phone) => {
  let _errors = null;
  if (phone == "" || phone == null || phone == undefined) {
    _errors = {
      phone: "Phone is required!",
    };
  } else if (!phonePattern.test(phone)) {
    _errors = {
      phone: "Phone is invalid!",
    };
  }
  return _errors;
}

const checkAccountExisted = async (data) => {
  const resCheckExistedPhone = await Customers.checkRegister(data);
  if (resCheckExistedPhone == null || resCheckExistedPhone == undefined) {
    resCheckExistedPhone = 0;
  }
  return resCheckExistedPhone > 0;
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  checkValidate,
  checkAccountExisted,
  comparePasswords,
  validateName,
  validatePhoneNumber
};
