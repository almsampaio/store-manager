const productsModel = require('../models/productsModel');
const validations = require('./validations/productsValidation');

async function create(name, quantity) {
  await validations.isNameValid(name);
  validations.isQuantityValid(quantity);

  const newProductId = await productsModel.create(name, quantity);
  return newProductId;
}

async function getAll() {
  const allDocuments = await productsModel.getAll();

  return allDocuments;
}

async function getById(id) {
  await validations.isIdValid(id);

  const document = await productsModel.getById(id);

  return document;
}

module.exports = {
  create,
  getAll,
  getById,
};
