const productsServices = require('../services/productsServices');

const validateNameProduct = (req, res, next) => {
    const { name } = req.body;
    const validateName = productsServices.validateNewProductName(name);
    if (validateName) {
        return res.status(422)
        .json({ err: { code: 'invalid_data', message: validateName.details[0].message } });
    }
    next();
};

const validateQuantityProduct = (req, res, next) => {
    const { quantity } = req.body;
    const validateQuantity = productsServices.validateNewQuantityName(quantity);
    if (validateQuantity) {
        return res.status(422)
        .json({ err: { code: 'invalid_data', message: validateQuantity.details[0].message } });
    }
       next();
};

module.exports = { validateNameProduct, validateQuantityProduct };