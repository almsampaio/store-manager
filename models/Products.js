const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection.getConnection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getByName = async (name) => {
  const db = await connection.getConnection();
  const productsByName = await db
  .collection('products')
  .find({ name }, {})
  .toArray();

  return productsByName;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  const productsById = await db
  .collection('products')
  .find({ _id: ObjectId(id) })
  .toArray();

  return productsById[0];
};

const addProduct = async ({ name, quantity }) => {
  const db = await connection.getConnection();
  const { insertedId: _id } = await db.collection('products').insertOne(
    { name, quantity },
  );

  return {
    _id,
    name,
    quantity,
  };
};

const updateProduct = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );

  return {
    _id: id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  await db.collection('products').deleteOne(
    { _id: ObjectId(id) },
  );

  return { _id: ObjectId(id) };
};

module.exports = {
  getAll,
  getByName,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};
