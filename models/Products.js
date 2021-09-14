const { ObjectId } = require('mongodb');
const connectionDB = require('./connectionDB');

const getAll = async () => {
  const getAllProducts = await connectionDB()
    .then((db) => db.collection('products').find({}).toArray());

  return getAllProducts;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

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

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const updateProduct = await connectionDB();
  await updateProduct.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { id, name, quantity };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
