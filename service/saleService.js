const saleModel = require('../model/saleModel');

const invalidData = 'invalid_data';
const minimumQuantity = 1;
const quantityError = { err:
  { code: invalidData, message: 'Wrong product ID or invalid quantity' },
};
const notFound = 'not_found';
const notFoundIdError = { err:
  { code: notFound, message: 'Sale not found' },
};
const wrongIdError = { err:
  { code: invalidData, message: 'Wrong sale ID format' },
};

const create = async (itensSoldArray) => {
  const isNotValid = itensSoldArray.find((item) =>
    item.quantity < minimumQuantity || typeof (item.quantity) !== 'number');
  if (isNotValid) return quantityError;
  const insertedSales = await saleModel.create(itensSoldArray);
  return { sales: insertedSales };
};

const getAll = async () => saleModel.getAll();

const getById = async (id) => {
  const saleById = await saleModel.getById(id);
  if (!saleById) return notFoundIdError;
  return { sale: saleById };
 };

 const update = async (id, updatedItensSoldArray) => {
  const isNotValid = updatedItensSoldArray.find((item) =>
    item.quantity < minimumQuantity || typeof (item.quantity) !== 'number');
  if (isNotValid) return quantityError;
  const updatedSale = await saleModel.update(id, updatedItensSoldArray);
  return { sale: updatedSale };
};

const remove = async (id) => {
  const saleById = await saleModel.remove(id);
  if (!saleById) return wrongIdError;
  return true;
 };

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
