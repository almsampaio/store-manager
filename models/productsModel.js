const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
}

const getById = async (id) => {
  // if (!ObjectId.isValid(id)) {
  //   return null;
  // }

  const product = await connection()
  .then((db) => db.collection('products').find({ _id: new ObjectId(id) }).toArray());

  // if (!product) {
  //  return null;
  //}

  return product;
}

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity,
    }))
    .then((result) => result.ops);
};

module.exports = {
  getAll,
  getById,
  create,
};
