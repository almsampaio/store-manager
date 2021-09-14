const { ObjectId } = require('mongodb');
const connection = require('./CONNECTIONS/MongoDBConnection');
const { MONGO_ERROR } = require('../CONSTANTS/Errors');

async function insertOneProductIntoMongoDB(productToInsert) {
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products').insertOne(productToInsert);
    const insertedProduct = responseOfQuery.ops[0];
    return insertedProduct;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function findOneProductByName(nameToFind) {
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products').findOne({ name: nameToFind });
    return responseOfQuery;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function findAllProductsInMongoDB() {
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products').find().toArray();
    return responseOfQuery;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function findOneProductInMongoDBByID(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products').findOne(new ObjectId(id));
    return responseOfQuery;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

module.exports = {
  insertOneProductIntoMongoDB,
  findOneProductByName,
  findAllProductsInMongoDB,
  findOneProductInMongoDBByID,
};
