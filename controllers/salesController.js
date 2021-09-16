const status = require('http-status');
const salesService = require('../services/salesService');
const generalError = require('../middlewares/error');

const createSales = async (req, res) => {
    const salesObject = req.body;
    const responseMSG = await salesService.addValidation(salesObject);

    if (typeof (responseMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(responseMSG));
    } 
    return res.status(status.OK).json(responseMSG);
};

module.exports = { createSales }; 