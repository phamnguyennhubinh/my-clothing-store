const {respFunction, resp, success, errors} = require('../utils/response');
const Feedbacks = require('../models/feedback');

exports.getFeedbacks = async (req,res) => {
    try {
        const result = await Feedbacks.getFb();
        respFunction(result,success,[]);
        res.send(resp);
    } catch (error) {
        throw error;
    }
};

exports.getFeedbackById = async (req,res) => {
    try {
        const result = await Feedbacks.getById(req.params.id);
        respFunction(result,success,[]);
        res.send(resp);
    } catch (error) {
        throw error;
    }
}