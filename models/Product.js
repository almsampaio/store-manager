const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'products';

exports.getAll = async () => {
  const db = await connection();

  const products = await db.collection(COLLECTION).find().toArray();

  return products;
};

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const product = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });

  return product;
};

exports.findByName = async (productName) => {
  const db = await connection();

  const product = await db.collection(COLLECTION).findOne({ name: productName });

  return product;
};

exports.createProduct = async ({ name, quantity }) => {
  const db = await connection();

  const product = await db.collection(COLLECTION).insertOne({ name, quantity });

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

  if (result.ok) {
      return {
      _id: id,
      name,
      quantity,
    };
  }

  return null;
};

exports.deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  await db
    .collection('products')
    .deleteOne({ _id: ObjectId(id) });

  return { ok: 1 };
};
