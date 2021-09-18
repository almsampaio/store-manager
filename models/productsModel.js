const { ObjectID } = require('bson');

const connections = require('./connections');

const postProduct = async (name, quantity) => {
  const db = await connections();

  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const searchByName = async (name) => {
  const db = await connections();

  const search = await db.collection('products').findOne({ name });
  return search;
};

const getAllProducts = async () => {
  const db = await connections();

  const allProducts = await db.collection('products').find({}).toArray();
  return { products: allProducts };
};

const getProductsByID = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connections();

  const productsByID = await db.collection('products').findOne({ _id: ObjectID(id) });
  if (!productsByID) return false;
  return productsByID;
};

const updateProductsByID = async (id, name, quantity) => {
  const db = await connections();
  
  await db.collection('products').updateOne(
    { _id: ObjectID(id) }, { $set: { name, quantity } },
  );

  return { _id: id, name, quantity };
};

module.exports = {
  postProduct,
  getAllProducts,
  getProductsByID,
  searchByName,
  updateProductsByID,
};
