const {
  insertOneProductIntoMongoDB, findOneProductByName, findAllProductsInMongoDB,
  findOneProductInMongoDBByID, updateOneProductIntoMongoDB, deleteOneProductFromMongoDB,
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

async function updateOneProductIntoSomeDB(id, productToUpdate) {
  const { name, quantity } = productToUpdate;
  const productExistence = false;

  const validQuantity = validateQuantity(quantity);
  if (validQuantity.err) return validQuantity;

  const validName = validateName(name, productExistence);
  if (validName.err) return validName;

  const returnedFromMongo = await updateOneProductIntoMongoDB(id, productToUpdate);
  return returnedFromMongo;
}

async function deleteOneProductFromSomeDB(id) {
  const productToDelete = findOneProductInMongoDBByID(id);
  const returnedFromMongo = await deleteOneProductFromMongoDB(id, productToDelete);
  if (!returnedFromMongo) return ERROR_PRODUCT_WRONG_ID;
  return returnedFromMongo;
}

module.exports = {
  insertOneProductIntoSomeDB,
  findAllProductsInSomeDB,
  findOneProductInSomeDBByID,
  updateOneProductIntoSomeDB,
  deleteOneProductFromSomeDB,
};
