const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const validations = require('./validations');

const salesErrorMessage = 'Wrong product ID or invalid quantity';
const customInfo = {
  message: 'Sale not found',
  status: 'notFound',
};

async function create(itensSold) {
  await Promise.all(itensSold.map(async ({ productId, quantity }) => {
    await validations.isIdValid(productId, productsModel.getById, salesErrorMessage);
    validations.isQuantityValid(quantity, salesErrorMessage);
  }));

  const newSalesId = await salesModel.create(itensSold);
  return newSalesId;
}

async function update(id, itensSold) {
  await validations.isIdValid(id, salesModel.getById, customInfo);

  await Promise.all(itensSold.map(async ({ productId, quantity }) => {
    await validations.isIdValid(productId, productsModel.getById, salesErrorMessage);
    validations.isQuantityValid(quantity, salesErrorMessage);
  }));

  await salesModel.update(id, itensSold);
}

// async function deleteDocument(id) {
//   await validations.isIdValid(id);

//   const deletedDocument = await productsModel.getById(id);
//   await productsModel.deleteDocument(id);

//   return deletedDocument;
// }

async function getAll() {
  const allDocuments = await salesModel.getAll();

  return allDocuments;
}

async function getById(id) {
  await validations.isIdValid(id, salesModel.getById, customInfo);

  const document = await salesModel.getById(id);

  return document;
}

module.exports = {
  create,
  update,
  // deleteDocument,
  getAll,
  getById,
};
