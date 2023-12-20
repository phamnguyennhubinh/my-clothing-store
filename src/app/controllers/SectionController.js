const Sections = require('../models/section');
const {respFunction, resp, success, errors, notExisted} = require('../utils/response');

exports.getSectionById = async (req,res) => {
    let _errors = [];
    try {
        const result = await Sections.getById(req.params.id);
        console.log(result);
        if(result.length == 0){
            _errors.push(notExisted("id"));
            respFunction([],errors[2],_errors);
        }
        respFunction(result,success,[]);
        res.send(resp);
    } catch (error) {
        throw error;
    }
};

exports.getShowSlide = async (req, res) => {
     try {
        const result = await Sections.getSlide();
        respFunction(result,success,[]);
        res.send(resp);
     } catch (error) {
        throw error;
     }
}