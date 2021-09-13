const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getProducts = async () => {
  const data = await connection().then((db) => db.collection('products')
    .find().toArray());
  return data;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Wrong id format');
  }

  const product = await connection()
  .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!product) throw new Error('Wrong id format');

  return product;
};

const addProduct = async (name, quantity) => {
  const data = await connection().then((db) => db.collection('products'));

  const alreadyExists = await data.find({ name }).toArray();

  if (alreadyExists.length === 0) {
    return data.insertOne({ name, quantity })
          .then((result) => ({ _id: result.insertedId, name, quantity }));
  }

  throw new Error('Product already exists');
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
};
