const {
  insertOneProductIntoMongoDB, findOneProductByName, findAllProductsInMongoDB,
  findOneProductInMongoDBByID,
} = require('../MODELS/ProductsModelMongo');

const { validateName, validateQuantity } = require('../utils/validateProductFields');

const {
  ERROR_PRODUCT_WRONG_ID,
} = require('../CONSTANTS/Errors');

async function insertOneProductIntoSomeDB(productToInsert) {
  const { name, quantity } = productToInsert;
  const productExistence = await findOneProductByName(name);

  const validName = validateName(name, productExistence);
  if (validName.err) return validName;

  const validQuantity = validateQuantity(quantity);
  if (validQuantity.err) return validQuantity;

  const returnedFromMongo = await insertOneProductIntoMongoDB(productToInsert);
  return returnedFromMongo;
}

async function findAllProductsInSomeDB() {
  const allProducts = await findAllProductsInMongoDB();
  return { products: allProducts };
}

async function findOneProductInSomeDBByID(id) {
  const product = await findOneProductInMongoDBByID(id);
  if (!product) return ERROR_PRODUCT_WRONG_ID;
  return product;
}

module.exports = {
  insertOneProductIntoSomeDB,
  findAllProductsInSomeDB,
  findOneProductInSomeDBByID,
};
