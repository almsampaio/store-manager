const salesModel = require('../models/salesModel');
const validations = require('./validations');

const formatGetResponse = (response) => {
  if (response.length === 1) {
    return response[0];
  }
  return {
    sales: response,
  };
};

const createSale = async (sale) => {
  const validationInputFormat = validations.validationFormatInputSales(sale);
  if (validationInputFormat) return validationInputFormat;

  const validationQuantity = validations.validationsQuantityService(sale);
  if (validationQuantity) return validationQuantity;

  const validationProductId = await validations.productIdValidationSales(sale);
  if (validationProductId) return validationProductId;

  const validateUpdateProductsQuantitys = await validations
  .validateUpdateProductsQuantitys(sale, 'post');
  if (validateUpdateProductsQuantitys) return validateUpdateProductsQuantitys;

  return salesModel.createSale(sale);
};

const getSales = async (id) => {
  if (!id) {
    const allproducts = await salesModel.getAllSales();
    return formatGetResponse(allproducts);
  }

  const productByURLID = await validations.validateURLId(id, 'sales');
  if (productByURLID.err) return productByURLID;

  return formatGetResponse(productByURLID);
};

const putSales = async (arraySalesToUpdate, id) => {
  const validationQuantity = validations.validationsQuantityService(arraySalesToUpdate);
  
  if (validationQuantity) return validationQuantity;

  // const productByURLID = await validations.validateURLId(id, 'sales');
  // if (productByURLID.err) return productByURLID;

  // return formatGetResponse(productByURLID);
};

// const putProducts = async (id, name, quantity) => {
//   const validationsName = await validations.validationsNameProduct('put', name, id);
//   if (validationsName) return validationsName;

//   const validationQuantity = await validations.validationsQuantityInsertProduct(quantity);
//   if (validationQuantity) return validationQuantity;

//   const productByURLID = await validations.validateURLId(id, 'products');
//   if (productByURLID.err) return productByURLID;

//   return productsModel.putProducts(id, name, quantity);
// };

module.exports = {
  createSale,
  getSales,
  putSales,
};
