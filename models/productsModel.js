const connection = require("./connection");

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then(result => ({ _id: result.insertedId, name, quantity }) );
}

const findByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({name}))
    .then(result => result || null);
}

module.exports = {
  create,
  findByName,
  getAllProducts,
};
