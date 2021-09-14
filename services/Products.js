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
  async get(id) {
    if (id) {
      validate.id(id);
      const product = await productsModel.get.byId(id);
      if (!product) throw new Error('Wrong id format');
      return product;
    }
    
    const products = await productsModel.get.all();
    return { products };
  },
  async update(id, body) {
    const foundProduct = await productsModel.get.byId(id);
    const { name, quantity } = body;
    if (!foundProduct) throw new Error('Product does not exist');
    validate.minValue({ quantity }, 1);
    validate.minLength(name, 5).textField('name');
    validate.typeOfNumber({ quantity });
    const product = await productsModel.update(id, body);
    return product;
  },
  async delete(id) {
    const product = await productsModel.delete(id);
    return product;
  },
};
