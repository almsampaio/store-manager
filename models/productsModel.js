// const { ObjectID } = require('bson');

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

module.exports = {
  postProduct,
  searchByName,
};
