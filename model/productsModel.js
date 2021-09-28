const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const getAllProducts = async () => {
  try {
    const result = await connection().then((db) => db.collection(collection).find().toArray());
    return result;
  } catch (error) {
    return error.message;
  }
};

const getById = async (id) => {
  try {
    const result = await connection().then((db) => db.collection(collection)
      .find({ _id: ObjectId(id) }).toArray());
    return result;
  } catch (error) {
    return error.message;
  }
};

const addNewProduct = async (newProduct) => {
  try {
    const result = await connection().then((db) => db.collection(collection)
      .insertOne(newProduct));
    return result.ops.pop();
  } catch (error) {
    return error.message;
  }
};

module.exports = {
    addNewProduct,
    getAllProducts,
    getById,
};