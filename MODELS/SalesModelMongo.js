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

async function findAllSalesInMongoDB() {
  const db = await connection();
  const responseFromQuery = await db.collection('sales').find().toArray();
  return { sales: responseFromQuery };
}

async function findOneSaleInMongoDB(id) {
  try {
    const db = await connection();
    const responseFromQuery = await db.collection('sales').findOne(new ObjectId(id));
    return responseFromQuery;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

module.exports = {
  insertOneSaleInMongoDB,
  findAllSalesInMongoDB,
  findOneSaleInMongoDB,
};
