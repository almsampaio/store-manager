const { getConnection } = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('products').insertOne({ name, quantity });
  return {
    _id,
    name,
    quantity,
  };
};

const getProductByName = async (productName) => {
  const db = await getConnection();
  const data = await db.collection('products').findOne({ name: productName });
  return data;
};

const getAllProducts = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find().toArray();
  return {
    products,
  };
};

const getProductById = async (id) => {
  const db = await getConnection();
  const product = await db.collection('products').find({ _id: id });

  if (!product) return false;

  return product;
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
};
