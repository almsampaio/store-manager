const productsModel = require('../models/Products');
const validate = require('../lib/validation');

module.exports = {
  async create(name, quantity) {
    const foundProduct = await productsModel.get.byName(name);
    validate.minValue({ quantity }, 1);
    validate.minLength(name, 5).textField('name');
    validate.typeOfNumber({ quantity });
    validate.isUnique(foundProduct, 'Product');
    const product = await productsModel.create(name, quantity);
    return product;
  },
};
