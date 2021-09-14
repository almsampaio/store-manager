const connection = require('./CONNECTIONS/MongoDBConnection');
const { mongoError } = require('../CONSTANTS/Errors');

async function insertOneProductIntoMongoDB(productToInsert) {
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products').insertOne(productToInsert);
    const insertedProduct = responseOfQuery.ops[0];
    return insertedProduct;
  } catch (err) {
    console.log(err);
    return mongoError;
  }
}

module.exports = {
  insertOneProductIntoMongoDB,
};
