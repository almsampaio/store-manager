const { ObjectId } = require('mongodb');
const connection = require('./connection');

exports.getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return products;
};

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  return product;
};

exports.findByName = async (productName) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ name: productName });

  return product;
};

exports.createProduct = async ({ name, quantity }) => {
  const db = await connection();

  const product = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};

exports.updateProduct = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const { result } = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  console.log('Product: ', result);

  if (result.ok) {
      return {
      _id: id,
      name,
      quantity,
    };
  }

  return null;
};
