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
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const responseFromQuery = await db.collection('sales').findOne(new ObjectId(id));
    return responseFromQuery;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function updateOneSaleInMongoDB(id, saleToUpdate) {
  try {
    const db = await connection();
    const responseFromQuery = await db.collection('sales')
      .updateOne({ _id: new ObjectId(id) }, { $set: { itensSold: saleToUpdate } });
    if (responseFromQuery) {
      return { _id: id, itensSold: saleToUpdate };
    }
    return null;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function deleteOneSaleFromMongoDBByID(id, saleToDelete) {
  try {
    const db = await connection();
    const queryResponse = db.collection('sales').deleteOne({ _id: new ObjectId(id) });
    if (queryResponse && saleToDelete) return saleToDelete;
    return null;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

module.exports = {
  insertOneSaleInMongoDB,
  findAllSalesInMongoDB,
  findOneSaleInMongoDB,
  updateOneSaleInMongoDB,
  deleteOneSaleFromMongoDBByID,
};
