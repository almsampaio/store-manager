const conn = require('./conn');

const createProductModel = async (name, quantity) => {
  const dbConn = await conn().then((db) => db.collection('products'));

  const { insertedId: _id } = await dbConn.insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  const db = await conn();
  const result = await db.collection('products').findOne({ name });
  return result;
};

module.exports = { createProductModel, getByName };