const salesModel = require('../models/salesModel');
const validations = require('./validations');

const createSale = async (sale) => {
  const validationInputFormat = validations.validationFormatInputSales(sale);
  if (validationInputFormat) return validationInputFormat;

  const validationQuantity = validations.validatioQuantitySale(sale);
  if (validationQuantity) return validationQuantity;

  const validationProductId = await validations.productIdValidationSales(sale);
  if (validationProductId) return validationProductId;

  const validateUpdateProductsQuantitys = await validations
  .validateUpdateProductsQuantitys(sale, 'post');
  if (validateUpdateProductsQuantitys) return validateUpdateProductsQuantitys;

  return salesModel.createSale(sale);
};

const getAllSales = async () => salesModel.getAllSales();

const getSalesById = async (id) => {
  const productByURLID = await validations.validateURLId(id, 'sales');
  if (productByURLID.err) return productByURLID;

  return salesModel.getSaleById(id);
};

async function PutBodyFormatedQuantity(sale, id) {
  const arrayWithDiferenceOldAndNewQuantity = [];

  const oldArraySale = await salesModel.getSaleById(id);
  const oldItensSold = oldArraySale.itensSold;

  for (let i = 0; i < sale.length; i += 1) {
  arrayWithDiferenceOldAndNewQuantity.push({
    productId: sale[i].productId,
    quantity: sale[i].quantity - oldItensSold[i].quantity,
  });
 }

  return arrayWithDiferenceOldAndNewQuantity;
}

const putSales = async (arraySalesToUpdate, id) => {
  const validationQuantity = validations.validatioQuantitySale(arraySalesToUpdate);
  if (validationQuantity) return validationQuantity;

  const productByURLID = await validations.validateURLId(id, 'sales');
  if (productByURLID.err) return productByURLID;

  // const validationProductId = await validations.productIdValidationSales(arraySalesToUpdate);
  // if (validationProductId) return validationProductId;

  const newArraySale = await PutBodyFormatedQuantity(arraySalesToUpdate, id);

  const validateUpdateProductsQuantitys = await validations
  .validateUpdateProductsQuantitys(newArraySale, 'put');
  if (validateUpdateProductsQuantitys) return validateUpdateProductsQuantitys;

  return salesModel.putSales(arraySalesToUpdate, id);
};

const deleteSales = async (id) => {
  const productByURLID = await validations.validateURLId(id, 'sales');
  console.log(productByURLID);
  if (productByURLID.err) return productByURLID;
  return salesModel.deleteSales(id);
};

module.exports = {
  createSale,
  // getSales,

  getAllSales,
  getSalesById,

  putSales,
  deleteSales,
};
