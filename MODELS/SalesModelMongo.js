const { ObjectId } = require('mongodb');
const connection = require('./CONNECTIONS/MongoDBConnection');
const { MONGO_ERROR } = require('../CONSTANTS/Errors');

async function insertOneSaleInMongoDB(saleToInsert) {
  const queryToInsert = { itensSold: saleToInsert };
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('sales').insertOne(queryToInsert);
    const insertedSale = responseOfQuery.ops[0];
    return insertedSale;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

module.exports = {
  insertOneSaleInMongoDB,
};
