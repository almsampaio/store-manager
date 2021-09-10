const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return { id: insertedId, name, quantity };
};

module.exports = {
  create,
};
