const saleModel = require('../model/saleModel');

const invalidData = 'invalid_data';
const minimumQuantity = 1;
const quantityError = { err:
  { code: invalidData, message: 'Wrong product ID or invalid quantity' },
};
const notFound = 'not_found';
const wrongIdError = { err:
  { code: notFound, message: 'Sale not found' },
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
  if (!saleById) return wrongIdError;
  return { sale: saleById };
 };

module.exports = {
  create,
  getAll,
  getById,
};
