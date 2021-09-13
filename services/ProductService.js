const ProductModel = require('../models/ProductModel');
const ProductSchema = require('../schemas/ProductSchema');

const create = async ({ name, quantity }) => {
  if (ProductSchema.validate(name, quantity).err) {
    return ProductSchema.validate(name, quantity);
  }
  const productNameExists = await ProductSchema.productExists(name);
  if (productNameExists.err) return productNameExists;

  const product = await ProductModel.create({ name, quantity });

  return product;
};

const getAll = async () => ProductModel.getAll();

module.exports = {
  create,
  getAll,
};
