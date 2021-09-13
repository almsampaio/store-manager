const connection = require('./connection');

exports.findByName = async (productName) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ name: productName });

  return product;
};

exports.createProduct = async ({ name, quantity }) => {
  const db = await connection();

  const product = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};
