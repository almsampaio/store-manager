const getConnection = require('./connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const add = async (name, quantity) => {
  const db = await getConnection();
  const addProduct = await db.collection('products').insertOne({ name, quantity });
  return { id: addProduct.insertedId, name, quantity };
};

const getByName = async (name) => {
  const db = await getConnection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null; // estou validadno o id, nao entendi direito
  
//   const db = await getConnection();
//   const product = await db.collection('products').findOne({ id });
//   return product;
// };

// const update = async () => {
//   const db = await getConnection();
// };

// const remove = async () => {
//   const db = await getConnection();
// };

module.exports = {
  getAll,
  add,
  // getById,
  getByName,
  // update,
  // remove,
};
