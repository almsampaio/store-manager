const {
  insertOneProductIntoMongoDB, findOneProductByName,
} = require('../MODELS/ProductsModelMongo');
const { validateName, validateQuantity } = require('../utils/validateProductFields');

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

module.exports = {
  insertOneProductIntoSomeDB,
};
