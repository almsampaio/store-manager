const connection = require('./connection');

const getByName = async (param) => {
  const db = await connection();
  const result = await db.collection('products').find({ name: param }).toArray();
  return result;
};

const create = async (name, quantity) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedId, name, quantity };
};

module.exports = {
  getByName,
  create,
};
