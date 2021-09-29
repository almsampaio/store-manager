// Solução encontrada em conjunto com Eduardo Costa - Turma 10A
const { ObjectId } = require('mongodb');

const connectionDb = require('./connection');

const getAll = async () => {
  const allProducts = await connectionDb()
    .then((db) => db.collection('products').find({}).toArray());
    return allProducts;
};

const newProduct = async (name, quantity) => {
  const productNew = await connectionDb()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return productNew;
};

const searchById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const searchId = await connectionDb()
    // .then((db) => db.collection('products').find({ id }).toArray());
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!searchId) return null;
  return searchId;
};

// const updateProduct = () => {

// };

module.exports = {
  newProduct,
  getAll,
  searchById,
};
