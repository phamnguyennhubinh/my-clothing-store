const success = 200;
const errors = [403, 500, 404];
const resp = {
  result: [],
  statusCode: Number,
  errors: [],
};

const respFunction = (result, status, error) => {
  resp.result = result;
  resp.statusCode = status;
  resp.errors = error;
};

const isRequired = (fieldName) => {
  return { [fieldName]: `${fieldName} is required!` };
};

const isInvalid = (fieldName) => {
  return { [fieldName]: `${fieldName} is invalid!` };
};

const notExisted = (fieldName) => {
  return { [fieldName]: `${fieldName} does not existed!` };
};

const isExisted_error = (fieldName) => {
  return { [fieldName]: `${fieldName} does existed!` };
};

module.exports = {
  resp,
  success,
  errors,
  isInvalid,
  isRequired,
  notExisted,
  isExisted_error,
  respFunction
};
