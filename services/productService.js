const productsModel = require('../models/productsModel');
const validations = require('./validations');

const listProducts = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) {
    const errorMessage = validations.notValidId();
    return { errorMessage };
  }

  return { product };
};

const create = async (name, quantity) => {
  const errorMessage = await validations.validationToCreate(name, quantity);

  console.log(errorMessage);
  if (errorMessage) return { errorMessage };

  const createdProduct = await productsModel.createProduct(name, quantity);
  return { createdProduct };
};

const update = async (id, name, quantity) => {
  const errorMessage = await validations.validateToUpdate(name, quantity);

  if (errorMessage) return { errorMessage };

  await productsModel.updateProduct(id, name, quantity);
};

module.exports = {
  listProducts,
  getById,
  create,
  update,
};
