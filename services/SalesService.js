const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');

const create = async (itensSold) => {
  const validations = await SalesSchema.validatePost(itensSold);
  if (validations.message) return validations;
  
  const sales = await SalesModel.create(itensSold);
  return { status: 200, sales };
};

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return { status: 200, sales };
};

const getById = async (id) => {
  const validations = await SalesSchema.validateGet(id);
  if (validations.message) return validations;

  const sales = await SalesModel.getById(id);
  return { status: 200, sales };
};

// const update = async (id, name, quantity) => {
//   const validations = ProductSchema.validatePut(name, quantity);
//   if (validations.message) return validations;

//   const product = await ProductsModel.update(id, name, quantity);
//   return { status: 200, product };
// };

// const exclude = async (id) => {
//   const validations = await ProductSchema.validateGet(id);
//   if (validations.message) return validations;

//   const product = await ProductsModel.getById(id);
//   await ProductsModel.exclude(id);
//   return { status: 200, product };
// };

module.exports = {
  create,
  getAll,
  getById,
  // update,
  // exclude,
};