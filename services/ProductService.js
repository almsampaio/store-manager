const ProductModel = require('../models/ProductModel');
const ProductSchema = require('../schemas/ProductSchema');

// ProductSchema.validate;

const create = async ({ name, quantity }) => {
  if (ProductSchema.validate(name, quantity).err) {
    return ProductSchema.validate(name, quantity);
  }
  const productNameExists = await ProductSchema.productExists(name);
  if (productNameExists.err) return productNameExists;

  const product = await ProductModel.create({ name, quantity });

  return product;
};

const getAll = async () => {};

module.exports = {
  create,
  getAll,
};

// console.log(create({ name: 'thyago 1', quantity: 1 }).then((data) => console.log(data)));