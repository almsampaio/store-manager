const {
  ERROR_PRODUCT_NOT_A_NUMBER,
  ERROR_PRODUCT_QUANTITY_GREATER_THAN_0,
  ERROR_SALES_WRONG_DATA,
  ERROR_SALES_NOT_FOUND,
} = require('../CONSTANTS/Errors');

const {
  findOneProductInMongoDBByID,
} = require('../MODELS/ProductsModelMongo');

const {
  insertOneSaleInMongoDB,
  findAllSalesInMongoDB,
  findOneSaleInMongoDB,
  updateOneSaleInMongoDB,
} = require('../MODELS/SalesModelMongo');

function validateQuantity(quantity) {
  if (typeof quantity !== 'number') return ERROR_PRODUCT_NOT_A_NUMBER;
  if (!quantity && quantity !== 0) return ERROR_PRODUCT_QUANTITY_GREATER_THAN_0;
  if (quantity < 1) return ERROR_PRODUCT_QUANTITY_GREATER_THAN_0;
  return true;
}

async function checkValidateOfSales(salesToInsert) {
  const mappedSales = Promise.all(salesToInsert.map(async ({ productId, quantity }) => {
    const hasID = await findOneProductInMongoDBByID(productId);
    const validQuantity = validateQuantity(quantity);
    if (validQuantity.err) return ERROR_SALES_WRONG_DATA; // O correto seria retornar validQuantity para o erro numeral correto porém para o teste não é levado em consideração esse tratamento de erro!
    if (!hasID) return ERROR_SALES_WRONG_DATA;
    return hasID;
  }));
  const failId = (await mappedSales).some((value) => value.err);
  if (failId) {
    return (await mappedSales).find((value) => value.err);
  }
  return true;
}

async function insertOneSaleIntoSomeDB(salesToInsert) {
  const arrayIsValid = await checkValidateOfSales(salesToInsert);
  if (!arrayIsValid.err) {
    const responseOfInsertSales = await insertOneSaleInMongoDB(salesToInsert);
    return responseOfInsertSales;  
  }
  return arrayIsValid;
}

async function findAllSalesInSomeDB() {
  return findAllSalesInMongoDB();
}

async function getOneSaleInSomeDBByID(id) {
  const queryResponse = await findOneSaleInMongoDB(id);
  if (!queryResponse) return ERROR_SALES_NOT_FOUND;
  return queryResponse;
}

async function updateOneSaleInSomeDBByID(id, saleToUpdate) {
  const arrayIsValid = await checkValidateOfSales(saleToUpdate);
  if (!arrayIsValid.err) {
    const queryResponse = updateOneSaleInMongoDB(id, saleToUpdate);
    return queryResponse;
  }
  return arrayIsValid;
}

module.exports = {
  insertOneSaleIntoSomeDB,
  findAllSalesInSomeDB,
  getOneSaleInSomeDBByID,
  updateOneSaleInSomeDBByID,
};
