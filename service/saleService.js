const saleModel = require('../model/saleModel');

const invalidData = 'invalid_data';
const minimumQuantity = 1;
const quantityError = { err:
  { code: invalidData, message: 'Wrong product ID or invalid quantity' },
};

const create = async (itensSoldArray) => {
  const isNotValid = itensSoldArray.find((item) =>
    item.quantity < minimumQuantity || typeof (item.quantity) !== 'number');
  if (isNotValid) return quantityError;
  const insertedSales = await saleModel.create(itensSoldArray);
  return { sales: insertedSales };
};

module.exports = {
  create,
};
