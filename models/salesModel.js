const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const sales = await salesCollection
    .find()
    .toArray();

  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const salesCollection = await connection()
  .then((db) => db.collection('sales'));

  const sale = await salesCollection
    .findOne({ _id: ObjectId(id) });
    return sale;
};

const create = async (arr) => {
  const connectionDb = await connection();

  const newSale = await connectionDb.collection('sales')
  .insertOne({ itensSold: arr });
  return newSale.ops[0];
};

// const update = async (id, name, quantity) => {
//   if (!ObjectId.isValid(id)) return false;

//   const connectionDb = await connection();

//   await connectionDb.collection('products')
//   .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

//   const newProduct = {
//     _id: id,
//     name,
//     quantity,
//   };

//   return newProduct;
// };

// const drop = async (id) => {
//   if (!ObjectId.isValid(id)) return false;

//   const connectionDb = await connection();

//   const deletedProduct = await connectionDb.collection('products')
//   .deleteOne({ _id: ObjectId(id) });

//   return deletedProduct;
// };

module.exports = {
  create,
  getAll,
  getSaleById,
  // update,
  // drop,
};
