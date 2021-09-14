// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getAll = async () => {
//   const salesCollection = await connection()
//     .then((db) => db.collection('sales'));

//   const sales = await salesCollection
//     .find()
//     .toArray();

//   return sales;
// };

// const getProductById = async (id) => {
//   if (!ObjectId.isValid(id)) return false;

//   const productsCollection = await connection()
//   .then((db) => db.collection('sales'));

//   const product = await productsCollection
//     .findOne({ _id: ObjectId(id) });
//     return product;
// };

const create = async (arr) => {
  // const allSales = await getAll();

  // const verifySale = allSales.find((sales, index) => sales.name === arr[index].name);

  // if (verifySale) return false;

  const connectionDb = await connection();

  const newSale = await connectionDb.collection('sales')
  .insert(arr);
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
  // getAll,
  // getProductById,
  // update,
  // drop,
};
