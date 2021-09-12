const ProductsModel = require('../models/ProductsModel');
const ProductSchema = require('../schemas/ProductSchema');

// AQUI É ONDE FICAM AS VALIDAÇÕES!!!

const create = async (name, quantity) => {
  const validations = ProductSchema.validate(name, quantity);

  if (validations.message) return validations;

  const product = await ProductsModel.create(name, quantity);
  
  return { code: 201, product };
};

// const getAll = async () => {
//   const products = await productsModel.getAll();

//   return products;
// };

// const getById = async (id) => {
//   const product = await productsModel.getById(id);
  
//   return product;
// };

// const update = async (name, quantity) => {
//   const product = await productsModel.update(name, quantity);
  
//   return product;
// };

// const exclude = async (id) => {
//   await productsModel.exclude(id);
// };

module.exports = {
  create,
};