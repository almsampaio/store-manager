const findOneProduct = require('../models/findOneProduct');

const err = {
    code: 'invalid_data',
    message: 'Product already exists',
};

const validateNameInTable = async (req, res, next) => {
    const { name } = req.body;
    const product = await findOneProduct(name);
    if (product) return res.status(422).json({ err });
    next();
};

module.exports = validateNameInTable;