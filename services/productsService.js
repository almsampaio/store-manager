const productsModel = require('../models/productsModel');
const validations = require('./validations');

async function create(name, quantity) {
  await validations.isNameValid(name, productsModel.getByName);
  validations.isQuantityValid(quantity);

  const newProductId = await productsModel.create(name, quantity);
  return newProductId;
}

async function update(id, name, quantity) {
  await validations.isIdValid(id, productsModel.getById);
  await validations.isNameValid(name);
  validations.isQuantityValid(quantity);

  await productsModel.update(id, name, quantity);
}

async function deleteDocument(id) {
  await validations.isIdValid(id, productsModel.getById);

  const deletedDocument = await productsModel.getById(id);
  await productsModel.deleteDocument(id);

  return deletedDocument;
}

async function getAll() {
  const allDocuments = await productsModel.getAll();

  return allDocuments;
}

async function getById(id) {
  await validations.isIdValid(id, productsModel.getById);

  const document = await productsModel.getById(id);

  return document;
}

module.exports = {
  create,
  update,
  deleteDocument,
  getAll,
  getById,
};
