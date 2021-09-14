const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();

  return { sales };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
};

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

const updateSale = async (id, data) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const saleToUpdate = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold: [...data] } },
    { returnDocument: 'after' },
  );
  return saleToUpdate.value;
};

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
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  // deleteProduct,

};