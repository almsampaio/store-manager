const productsServices = require('../services/productsServices');

const validateNameNewProduct = (req, res, next) => {
    const { name } = req.body;
    const validateName = productsServices.validateNewProductName(name);
    if (validateName) {
        return res.status(422)
        .json({ err: { code: 'invalid_data', message: validateName.details[0].message } });
    }
    next();
};

const validateQuantityNewProduct = (req, res, next) => {
    const { quantity } = req.body;
    const validateQuantity = productsServices.validateNewQuantityName(quantity);
    if (validateQuantity) {
        return res.status(422)
        .json({ err: { code: 'invalid_data', message: validateQuantity.details[0].message } });
    }

    if (!validateQuantity) next();
};

module.exports = { validateNameNewProduct, validateQuantityNewProduct };