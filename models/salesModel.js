const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'sales';

// REQUISITO 5 _______________________________________________________________________//

const createSale = async (sales) => {
  const db = await connection();
  const addSales = await db.collection(COLLECTION_NAME).insertOne({ itensSold: sales });
  return addSales.ops[0];
};

// REQUISITO 6 _______________________________________________________________________//

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection(COLLECTION_NAME).find({}).toArray();
  return { sales };
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection(COLLECTION_NAME).findOne(ObjectId(id));
  return sale;
};

// REQUISITO 7 _______________________________________________________________________//

const updateSales = async (id, sale) => {
  const { productId, quantity } = sale[0];
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: { productId, quantity } } },
  );
  const updatedSales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return updatedSales;
};

// REQUISITO 8 _______________________________________________________________________//

const deleteSales = async (id) => {
  const db = await connection();
  const deleteId = await getSaleById(id);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) });
  const salesDelete = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
  return { deleteId, salesDelete };
};

// __________________________________________________________________________________//

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSales,
  deleteSales,
};
