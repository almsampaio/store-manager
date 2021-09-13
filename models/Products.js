const connection = require('./connection');

const findAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const findProductById = async (id) => {
  const db = await connection();
  const productById = await db.collection('products').findOne({ id });
  return productById;
};

const findProduct = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const create = async (name, quantity) => {
  const db = await connection();
  const created = await db.collection('products').insertOne({ name, quantity });
  return { _id: created.insertedId, name, quantity };
}
  // connection()
  //   .then((db) => db.collection('products').insertOne({ name, quantity }))
  //   .then((result) => getNewProduct({ _id: result.insertedId, name, quantity }));

module.exports = {
  create,
  findProduct,
  findAllProducts,
  findProductById,
};
