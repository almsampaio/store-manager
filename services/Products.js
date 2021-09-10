const productsModel = require('../models/Products');
const validate = require('../lib/validation');

module.exports = {
  async create(name, quantity) {
    validate.minLength(name, 5).textField('name');
    const product = await productsModel.create(name, quantity);
    return product;
  },
};
