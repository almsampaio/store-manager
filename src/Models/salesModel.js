// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getAllSales = async () => {
//   const db = await connection();
//   const products = await db.collection('products').find({}).toArray();

//   return { products };
// };

// const getProductById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }

//   const db = await connection();
//   const product = await db.collection('products').findOne(ObjectId(id));

//   return product;
// };

const addSales = async (data) => {
  const db = await connection();

  const sales = await db.collection('sales').insertMany(
    [
      {
        itensSold: [
         ...data,
        ],
      }],
  );
  return {
    _id: sales.insertedIds[0],
    ...sales.ops[0],
  };
};

// const updateProduct = async (id, name, quantity) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }
//   const db = await connection();
//   const productToUpdate = await db.collection('products').findOneAndUpdate(
//     { _id: ObjectId(id) },
//     { $set: { name, quantity } },
//     { returnDocument: 'after' },
//   );
//   return productToUpdate.value;
// };

// const deleteProduct = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }

//   const db = await connection();
//   const productToDelete = await db.collection('products').findOneAndDelete(
//     { _id: ObjectId(id) },
//     { returnDocument: 'after' },
//   );

//   return productToDelete.value;
// };

module.exports = {
  // getAllProducts,
  // getProductById,
  addSales,
  // updateProduct,
  // deleteProduct,

};