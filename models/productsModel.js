// const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const { messageErro } = require('../midllewares/productMiddleware');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const createProd = async (name, quantity) =>
  connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

const findAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

// connection().then((db) => db.collection('products').find().toArray());

// const findOneProduct = (id) => {
//   if (!ObjectId(id)) return messageErro.wrongIdFormat;

//   return connection().then((db) =>
//     db
//       .collection('products')
//       .findOne({ _id: ObjectId(id) })
//       .toArray());
// };

module.exports = {
  getAllProducts,
  createProd,
  findAllProducts,
  // findOneProduct,
};
