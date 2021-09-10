const connection = require('./connection');

const getNewProduct = (data) => {
  const { id, name, quantity } = data;
  return { id, name, quantity };
};

const createNewProduct = async (name, quantity) => {
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));
};

const findProductByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(name));
  if (!product) return null;
  return product;
};
module.exports = {
  createNewProduct,
  findProductByName,
};