const salesModel = require('../models/sales');

const validateQuantity = (itemSaled) => {
  const equalToZero = itemSaled.some(({ quantity }) => quantity === 0);
  const leastThanZero = itemSaled.some(({ quantity }) => quantity < 0);
  const notTypeNumber = itemSaled.some(({ quantity }) => typeof quantity === 'string');
  if (notTypeNumber) {
    return {
     err1: { err: 
      { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
     err2: { errCode: 422 },
    };
   }
  if (leastThanZero || equalToZero) {
    return {
      err1: { err: 
        { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
      err2: { errCode: 422 },
     };
  }
  return {};
};

const create = async (itemSaled) => {
  const validateQuantitySaled = validateQuantity(itemSaled);
  if (validateQuantitySaled.err1) return validateQuantitySaled;

  const sale = await salesModel.create(itemSaled);
  const formatedSale = {
    _id: sale.insertedId,
    itensSold: itemSaled,
  };
  return formatedSale;
};

module.exports = {
  create,
};