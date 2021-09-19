const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = db.collection('products').find().toArray();
  return products;
};

const getProductId = async (id) => {
  const db = await connection();
  const productId = db.collection('products').findOne({ _id: id });
  if (!productId) return null;
  return productId;
};

const getProductName = async (name) => {
  const db = await connection();
  const productName = db.collection('products').findOne({ name });
  if (!productName) {
  return null;
  }
  return productName;
};

const insertProducts = async (name, quantity) => {
  const db = await connection();
  const newProduct = db.collection('products').insertOne({ name, quantity })
    .then((result) => ({ _id: result.insertedId, name, quantity }));
  return newProduct;
};

module.exports = {
  getAll,
  insertProducts,
  getProductName,
  getProductId,
};
