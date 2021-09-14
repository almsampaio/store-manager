const { ObjectId } = require('mongodb');
const connectionDB = require('./connectionDB');

const getAll = async () => {
  const getAllProducts = await connectionDB()
    .then((db) => db.collection('products').find({}).toArray());

  return getAllProducts;
};

const findById = async (id) => {
  const productsData = await connectionDB()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  
  if (!productsData) return null;
  
  return productsData;
};

const create = async (name, quantity) => {
  const { ops: newProduct } = await connectionDB()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return newProduct[0];
};

module.exports = {
  getAll,
  findById,
  create,
};
