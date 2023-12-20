const {checkNotNull} = require('../utils/checkErrUtil');
var Categories = require('../models/categories');


const validateUpdateCategory = async (data) => {
    let _errors = [];
    _errors = validateCategoryName(data.categoryName);
    const isExisted = await Categories.getById(data.categoryID).catch((error) =>
      console.log(error)
    );
    if(!checkNotNull(data.categoryID))
    {
        _errors.push({categoryID: "CategoryID is required!"})
    } else if (!checkNotNull(isExisted[0])) {
      _errors.push({
        categoryID: `CategoryID not existed!`,
      });
    }
    return _errors;
}

const validateCategoryName = (categoryName) => {
    const namePattern = /^[A-Za-zÀ-ỹ\s']+$/;
    let _errors = [];
    if(!checkNotNull(categoryName))
    {
        _errors.push({categoryName: "CategoryName is required!"})
    } else if(!namePattern.test(categoryName))
    {
        _errors.push({categoryName: "CategoryName invalid!"})
    } else if(categoryName.length > 100){ 
        _errors.push({categoryName: "CategoryName too long!"});
    }
    return _errors;
}

module.exports = {validateCategoryName, validateUpdateCategory};