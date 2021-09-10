const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const PRODUCTS_COLLECTION = 'products';

const create = async ({ name, quantity }) => {
  const productCollection = await getConnection();

  const exists = await productCollection.collection(PRODUCTS_COLLECTION).findOne({ name });

  if (exists) return null;

  const insertedProduct = await productCollection.collection('products')
    .insertOne({ name, quantity });

  return insertedProduct.ops[0];
};

const getByID = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productCollection = await getConnection();

  const product = await productCollection.collection(PRODUCTS_COLLECTION)
    .findOne({ _id: ObjectId(id) });
  return product;
};

const getAll = async () => {
  const productCollection = await getConnection();

  const products = await productCollection.collection(PRODUCTS_COLLECTION).find({}).toArray();

  if (products.length > 0) return { products };

  return products;
};

module.exports = { create, getAll, getByID };
