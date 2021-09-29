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

module.exports = {
  createData,
  getAll,
};
