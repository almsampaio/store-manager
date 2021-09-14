const ProductModel = require('../models/ProductModel');
const ProductSchema = require('../schemas/ProductSchema');

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (ProductSchema.productNotFound(product).err) {
    return ProductSchema.productNotFound(product);
  }

  return product;
};

const create = async ({ name, quantity }) => {
  if (ProductSchema.validate(name, quantity).err) {
    return ProductSchema.validate(name, quantity);
  }
  const productNameExists = await ProductSchema.productExists(name);
  if (productNameExists.err) return productNameExists;

  const product = await ProductModel.create({ name, quantity });

  return product;
};

const update = async (id, { name, quantity }) => {
  if (ProductSchema.validate(name, quantity).err) {
    return ProductSchema.validate(name, quantity);
  }

  const updatedProduct = await ProductModel.update(id, { name, quantity });

  if (!updatedProduct) return {};

  return updatedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
