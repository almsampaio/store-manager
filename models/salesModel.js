const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getSalesByID = async (id) => {
  const db = await connection();
  const sales = await db.collection('sales').findOne(ObjectId(id));
  return sales;
};

const createNewSales = async (sales) => {
  const db = await connection();
  const newSales = await db.collection('sales').insertOne({ itensSold: sales });
  return getSalesByID(newSales.insertedId);
};

// const findProductByName = async (name) => {
//   const db = await connection();
//   const product = await db.collection('products').findOne({ name });
//   return product;
// };

// const getAllProducts = async () => {
//   const db = await connection();
//   const products = await db.collection('products').find().toArray();
//   return { products };
// };

// const updateProductByID = async (id, name, quantity) => {
//   const db = await connection();
//   await db.collection('products').updateOne({ _id: ObjectId(id) },
//     { $set: { name, quantity } });
//   return getProductByID(id);
// };

// const deleteProductByID = async (id) => {
//   const db = await connection();
//   const deletedProduct = await db.collection('products').findOne(ObjectId(id));

//   await db.collection('products').deleteOne({ _id: ObjectId(id) });

//   return deletedProduct;
// };

module.exports = {
  createNewSales,
  // findProductByName,
  // getAllProducts,
  // getProductByID,
  // updateProductByID,
  // deleteProductByID,
};
