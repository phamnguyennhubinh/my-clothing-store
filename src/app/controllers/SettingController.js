const Setting = require('../models/setting');
const {respFunction, resp, success, errors, notExisted} = require('../utils/response');

exports.getSettingByName = async (req,res) => {
    let _errors = [];
    try {
        const result = await Setting.getSetting(req.params.name);
        if(result.length == 0){
            _errors.push(notExisted("key"));
            respFunction([],errors[2],[]);
            res.send(resp);
            return;
        }
        respFunction(result,success,[]);
        res.send(resp);
    } catch (error) {
        throw error;
    }
};
