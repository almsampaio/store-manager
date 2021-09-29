const { ObjectId } = require('mongodb');
const connection = require('./conection');

const getAll = async () => (
  connection()
  .then((db) => db.collection('products').find().toArray())
  );

const createData = (name, quantity) => (
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  return productData;
};

module.exports = {
  createData,
  getAll,
  findById,
};
