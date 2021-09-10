const getConnection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await getConnection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
};
