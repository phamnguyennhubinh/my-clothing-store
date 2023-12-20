var Categories = require("../models/categories");
const { resp, success, errors } = require("../utils/response");
const { checkNotNull } = require("../utils/checkErrUtil");
const {
  validateCategoryName,
  validateUpdateCategory,
} = require("../utils/categoryUtil");

//get list category
exports.get_list = async function (req, res) {
  await Categories.getAll()
    .then((data) => (resp.result = data[0]))
    .catch((error) => console.log(error));
  resp.statusCode = success;
  resp.errors = [];
  res.send(resp);
};

//add new category
exports.addCategory = async function (req, res) {
  var data = req.body;
  let _errors = [];

  //validate categoryName includes null, too long and invalid(contains number)
  _errors = validateCategoryName(data.categoryName);

  if (_errors.length > 0) {
    resp.statusCode = errors[0];
    resp.errors = _errors;
    res.send(resp);
    return;
  }
  try {
    await Categories.create(data)
      .then((item) => resp.result.push(item))
      .catch((error) => console.log(error));
    resp.statusCode = success;
    res.send(resp);
  } catch (error) {
    throw error;
  }
};

//remove category
exports.removeCategory = async function (req, res) {
  var id = req.params.id;
  try {
    await Categories.remove(id).catch((error) => console.log(error));
    resp.statusCode = success;
    res.send(resp);
  } catch (error) {
    resp.statusCode = errors[1]; // this error is 500
    res.send(resp);
    console.error("This is an error in process removeCategory: ", error);
  }
};

//update category
exports.updateCategory = async function (req, res) {
  var data = req.body;
  let _errors = [];
  try {
    _errors = await validateUpdateCategory(data);
    if (_errors.length > 0) {
      resp.statusCode = errors[0];
      resp.errors = _errors;
      res.send(resp);
      return;
    }
    await Categories.update(data)
      .then((item) => (resp.result = item))
      .catch((error) => console.log(error));
    resp.statusCode = success;
    res.send(resp);
  } catch (error) {
    resp.statusCode = errors[1]; //this a an error 500
    res.send(resp);
    console.error("This is an error in processing updateCategory: ", error);
  }
};

//category detail
exports.detail = async function (req, res) {
    let _errors = [];
  try {
    //find categoryID in categories
    const isExisted = await Categories.getById(req.params.id).catch((error) =>
      console.log(error)
    );
    //check it existed, if it existed -> true else false
    if (checkNotNull(isExisted[0])) {
      // case it true -> categoryID existed -> send detail category
      resp.result = isExisted[0];
      resp.statusCode = success;
      res.send(resp);
    } else {
    _errors.push({
        categoryID: `CategoryID not existed!`,
      });
      resp.statusCode = errors[2]; //its error 404
      resp.result = _errors;
      res.send(resp);
    }
  } catch (error) {
    resp.statusCode = errors[1]; //this is error 500
    console.error("This is an error in processing: ", error);
  }
};
