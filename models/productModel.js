const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const products = await productsCollection
    .find()
    .toArray();

  return products;
};

const getProductById = async (id) => {
  const productsCollection = await connection()
  .then((db) => db.collection('products'));
  if (!ObjectId.isValid(id)) return false;

  const product = await productsCollection
    .findOne({ _id: ObjectId(id) });
    return product;
};

const create = async (name, quantity) => {
  const allProducts = await getAll();

  const verifyProduct = allProducts.find((product) => product.name === name);

  if (verifyProduct) return false;

  const connectionDb = await connection();

  const newProduct = await connectionDb.collection('products')
  .insertOne({ name, quantity });

  return newProduct.ops[0];
};

module.exports = {
  create,
  getAll,
  getProductById,
};
