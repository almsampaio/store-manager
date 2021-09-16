const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const db = await connection();

  const newProduct = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ name });

  return product;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();

  const author = await db.collection('products').findOne(new ObjectId(id));

  return author;
};

const getAllProducts = async () => {
  const db = await connection();

  const author = await db.collection('products').find().toArray();

  return { products: author };
};

const updateOne = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const product = await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};

module.exports = { 
  create, 
  findByName,
  getAllProducts,
  findById,
  updateOne,
 };