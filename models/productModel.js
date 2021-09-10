const { getConnection } = require('./connection');

const create = async ({ name, quantity }) => {
  const productCollection = await getConnection();

  const exists = await productCollection.collection('products').findOne({ name });

  if (exists) return null;

  const insertedProduct = await productCollection.collection('products')
    .insertOne({ name, quantity });

  return insertedProduct.ops[0];
};

module.exports = { create };
