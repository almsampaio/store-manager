const productsModel = require('../models/Products');

module.exports = {
  async create(name, quantity) {
    const product = await productsModel.create(name, quantity);

    return product;
  },
};
