const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getSaleByID = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const createNewSales = async (sales) => {
  const db = await connection();
  const newSales = await db.collection('sales').insertOne({ itensSold: sales });
  return getSaleByID(newSales.insertedId);
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return { sales };
};

const updateSaleByID = async (id, productId, quantity) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) },
  { $set: { 'itensSold.$[element].quantity': quantity } },
  { arrayFilters: [{ 'element.productId': productId }] });
  return getSaleByID(id);
};

const deleteSalestByID = async (id) => {
  const db = await connection();
  const deletedSales = await db.collection('sales').findOne(ObjectId(id));

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return deletedSales;
};

module.exports = {
  createNewSales,
  getAllSales,
  getSaleByID,
  updateSaleByID,
  deleteSalestByID,
};
