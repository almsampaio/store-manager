const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (name, quantity) => {
  const db = await getConnection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await getConnection();
  const product = await db.collection('products').findOne({name});
  return product;
};


module.exports = {
  // getAll,
  // getById,
  create,
  findByName,
  // editById,
  // deleteById
};
