// const { ObjectId } = require('mongodb');

const ProductsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  const alreadyExists = await ProductsModel.findByName(name);

  if (alreadyExists) {
    return { 
      error: { 
        code: 'invalid_data', 
        message: 'Product already exists', 
      },
    };
  }

  const newProduct = await ProductsModel.create({ name, quantity });

  return { newProduct };
};

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();

  return products;
};

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  if (!product) {
    return { 
      error: { 
        code: 'invalid_data', 
        message: 'Wrong id format', 
      }, 
    };
  }

  return { product };
};

const updateOne = async (id, { name, quantity }) => {
  const updated = await ProductsModel.updateOne(id, { name, quantity });

  if (!updated) {
    return {
      error: { 
        code: 'not_found', 
        message: 'Wrong id format or id not exist', 
      }, 
    };
  }

  return { updated };
};

const eliminate = async (id) => {
const eliminated = await ProductsModel.eliminate(id);

  if (!eliminated) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return { eliminated };
};

module.exports = {
  create,
  getAllProducts,
  findById,
  updateOne,
  eliminate,
};