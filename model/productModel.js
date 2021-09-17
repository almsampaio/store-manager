// Onde tem as queries - contato direto com o banco
const { ObjectId } = require('bson');
const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const findName = await db.collection('products').findOne({ name });
  console.log(findName);
  if (findName) return { statusCode: 422 };
  const result = await db.collection('products').insertOne({ name, quantity });
  console.log(result);
  return { _id: result.insertedId, name, quantity };
};

// ref aula ao vivo  27.2
const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  create,
  getAllProducts,
  getProductById,
};