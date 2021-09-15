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
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products').findOne(new ObjectId(id));
    return responseOfQuery;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function updateOneProductIntoMongoDB(id, productToUpdate) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: productToUpdate });
    if (responseOfQuery) {
      const { name, quantity } = productToUpdate;
      return { _id: id, name, quantity };
    }
    return null;
  } catch (err) {
    console.log(err);
    return MONGO_ERROR;
  }
}

async function deleteOneProductFromMongoDB(id, productToDelete) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  try {
    const db = await connection();
    const responseOfQuery = await db.collection('products')
      .deleteOne({ _id: new ObjectId(id) });
    if (responseOfQuery && productToDelete) return productToDelete;
    return null;
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
  updateOneProductIntoMongoDB,
  deleteOneProductFromMongoDB,
};
