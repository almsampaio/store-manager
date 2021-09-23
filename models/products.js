const connection = require('../connection');

const modelCreate = async (name, amount) => {
  const db = await connection();
  const elements = db.collection('products').insertOne({ name, amount });
  return { _id: elements.insertedId, name, amount };
};

const modelGetAll = async () => {
  const db = await connection();
  const elements = db.collection('products').find().toArray();
  return elements;
};

module.exports = {
  modelCreate,
  modelGetAll,
};