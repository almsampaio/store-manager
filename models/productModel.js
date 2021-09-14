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
  if (!ObjectId.isValid(id)) return false;

  const productsCollection = await connection()
  .then((db) => db.collection('products'));

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

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return false;

  const connectionDb = await connection();

  await connectionDb.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  const newProduct = {
    _id: id,
    name,
    quantity,
  };

  return newProduct;
};

module.exports = {
  create,
  getAll,
  getProductById,
  update,
};
