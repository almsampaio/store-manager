// const { ObjectID } = require('mongodb');
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

module.exports = {
  create,
  findByName,
};
