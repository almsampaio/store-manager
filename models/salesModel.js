const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const createSales = async (itensSold) => {
  const db = await getConnection();
  const newSold = await db.collection('sales').insertOne({ itensSold });
  console.log(itensSold);
  return { _id: newSold.insertedId, itensSold };
};

const updateSales = async (id, newSales) => {
  const db = await getConnection();
  const updateId = await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: newSales } });
  return updateId;
};

const IdSaleExists = async (id) => {
  const db = await getConnection();
  const ids = await db.collection('sales').findOne({ id });
  return ids;
};

const deleteSales = async (id) => {
  const db = await getConnection();
  const deleteId = await db.collection('sales')
  .deleteOne({ _id: ObjectId(id) });
  return deleteId;
};

const getSalesId = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sales;
};

const getAllSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesId,
  updateSales,
  IdSaleExists,
  deleteSales,
};