const connection = require('./connection');

exports.getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();
  console.log(products);

  return products;
};

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
