const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const validations = require('./validations');

async function create(itensSold) {
  const salesErrorMessage = 'Wrong product ID or invalid quantity';

  await Promise.all(itensSold.map(async ({ productId, quantity }) => {
    await validations.isIdValid(productId, productsModel.getById, salesErrorMessage);
    validations.isQuantityValid(quantity, salesErrorMessage);
  }));

  const newSalesId = await salesModel.create(itensSold);
  return newSalesId;
}

// async function update(id, name, quantity) {
//   await validations.isIdValid(id);
//   await validations.isNameValid(name);
//   validations.isQuantityValid(quantity);

//   await productsModel.update(id, name, quantity);
// }

// async function deleteDocument(id) {
//   await validations.isIdValid(id);

//   const deletedDocument = await productsModel.getById(id);
//   await productsModel.deleteDocument(id);

//   return deletedDocument;
// }

// async function getAll() {
//   const allDocuments = await productsModel.getAll();

//   return allDocuments;
// }

// async function getById(id) {
//   await validations.isIdValid(id);

//   const document = await productsModel.getById(id);

//   return document;
// }

module.exports = {
  create,
  // update,
  // deleteDocument,
  // getAll,
  // getById,
};
