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

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products);
}

const findProductById = async(id) => {
  return connection()
    .then((db) => db.collection('products').find())
    .then(result => result);

}

module.exports = {
  create,
  findByName,
  getAllProducts,
};
