const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const sale = await db.collection('sales')
    .insertOne({ itensSold });
  return { _id: sale.insertedId, itensSold };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  const updatedSales = await findById(id);
  return updatedSales;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  findById,
  updateSale,
  deleteSale,
};
