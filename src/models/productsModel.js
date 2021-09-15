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

module.exports = { 
  create, 
  findByName,
  getAllProducts,
  findById,
 };