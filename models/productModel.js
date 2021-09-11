const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne(new ObjectId(id));

  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return { products: result };
};

const findOneByName = async ({ name }) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const create = async ({ name, quantity }) => {
  const alreadyExists = await findOneByName({ name });

  if (alreadyExists) return null;

  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return result.ops[0];
};

const update = async ({ id, name, quantity }) => {
  const db = await connection();
  const result = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return result;
};

const remove = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
