// const { ObjectID } = require('mongodb');
const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity,
    }));
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const findByName = async (name) => connection()
    .then((db) => db.collection('products').findOne({
      name,
    }));

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((result) => (result));

const findById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const products = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectID(id) }));
  // console.log(products);
  // .then((result) => result);
  return products;
};

const updateById = async (id, name, quantity) => {
  const db = await connection();
  await db.collection('products')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
  const findOne = findById(id);
  return findOne;
};

const deleteById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const db = await connection();
  const products = await db.collection('products')
    .deleteOne({ _id: ObjectID(id) });
  return products;
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  updateById,
  deleteById,
};
