const { ObjectId } = require('mongodb');
const connection = require('./connections');

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const createNewProduct = async (name, quantity) => {
  const productNew = await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: productNew.insertedId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
    return {
      products,
    };
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const product = await connection()
    .then((db) => db.collection('products').findOne({
      _id: ObjectId(id),
    }));
    return product;
};

module.exports = {
  findByName,
  createNewProduct,
  getAll,
  getProductById,
};