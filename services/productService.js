const productsModel = require('../models/productsModel');

const errorMessage = require('../utils/errorMessage');

const { invalidData, nameMinimumLength, minimumQty,
  qtyMustBeANumber, productExists, wrongIdFormat } = errorMessage;

const getAll = async (_req, _res) => {
    const products = await productsModel.getAll();
    return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { code: invalidData, message: wrongIdFormat };
  return product;
};

const create = async (name, quantity) => {
  if (name.length < 6) {
    console.log('name.length ------- productService', name.length);
    return { code: invalidData, message: nameMinimumLength };
  }
  if (quantity <= 0) {
    console.log('quantity ------- productService', quantity);
    return { code: invalidData, message: minimumQty };
  }
  if (typeof quantity !== 'number') {
    console.log('typeof quantity ------- productService', typeof quantity);
    return { code: invalidData, message: qtyMustBeANumber };
  }

  const nameExists = await productsModel.findByName(name);
  console.log('nameExists ------- productService', nameExists);
    if (!nameExists) return { code: invalidData, message: productExists };

  const product = await productsModel.create(name, quantity);
  console.log('product ------- productService', product);

  return product;
};

const actualize = async (name, quantity, id) => {
  if (name.length < 6) {
    return { code: invalidData, message: nameMinimumLength };
  }
  if (quantity <= 0) {
    return { code: invalidData, message: minimumQty };
  }
  if (typeof quantity !== 'number') {
    return { code: invalidData, message: qtyMustBeANumber };
  }
  const updatedData = await productsModel.updateById(name, quantity, id);
  return updatedData;
};

const remove = async (id) => {
  const product = await productsModel.remove(id);
  return product;
};

module.exports = { 
  create,
  getAll,
  getById,
  actualize,
  remove,
};
