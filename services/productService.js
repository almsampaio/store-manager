const productModel = require('../models/productModel');

const validateName = async (name, quantity) => {
    if (name.length < 5) {
      return '"name" length must be at least 5 characters long';
    }

    const existName = await productModel.exist(name);

    if (existName !== null) {
      return 'Product already exists';
    }

    if (quantity <= 0) {
      return '"quantity" must be larger than or equal to 1';
    }

    if (typeof (quantity) === 'string') {
      return '"quantity" must be a number';
    }
    const create = await productModel.add(name, quantity);
    return create;
};

module.exports = { validateName }; 
