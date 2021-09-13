const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const isValidID = (id) => ObjectId.isValid(id);

const PRODUCTS_COLLECTION = 'products';

const create = async ({ name, quantity }) => {
  const connection = await getConnection();

  const exists = await connection.collection(PRODUCTS_COLLECTION).findOne({ name });
  if (exists) return null;

  const insertedProduct = await connection.collection('products')
    .insertOne({ name, quantity });
  return insertedProduct.ops[0];
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (id) => {
  if (!isValidID(id)) return null;

  const connection = await getConnection();

  const product = await connection.collection(PRODUCTS_COLLECTION)
    .findOne({ _id: ObjectId(id) });
  return product;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => {
  const connection = await getConnection();

  const products = await connection.collection(PRODUCTS_COLLECTION).find({}).toArray();

  return { products };
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (id, { name, quantity }) => {
  if (!isValidID(id)) return null;

  const filter = { _id: ObjectId(id) };

  const document = { $set: { quantity, name } };

  const options = { returnDocument: 'after' };

  const db = await getConnection();

  const result = await db.collection(PRODUCTS_COLLECTION)
    .findOneAndUpdate(filter, document, options);

  return result.value;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (id) => {
  if (!isValidID(id)) return null;

  const filter = { _id: ObjectId(id) };

  const connection = await getConnection();

  const result = await connection.collection(PRODUCTS_COLLECTION).findOneAndDelete(filter);

  return result.value;
};

module.exports = { create, getAll, getByID, update, exclude };
