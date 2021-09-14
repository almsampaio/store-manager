const {
  insertOneProductIntoMongoDB,
} = require('../MODELS/ProductsModelMongo');

async function insertOneProductIntoSomeDB(productToInsert) {
  const returnedFromMongo = await insertOneProductIntoMongoDB(productToInsert);
  return returnedFromMongo;
}

module.exports = {
  insertOneProductIntoSomeDB,
};
