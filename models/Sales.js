const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection.getConnection();

  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  const saleById = await db
  .collection('sales')
  .find({ _id: ObjectId(id) })
  .toArray();

  return saleById[0];
};

const addSales = async (salesList) => {
  const db = await connection.getConnection();
  const { insertedId: _id } = await db.collection('sales').insertOne(
    { itensSold: salesList },
  );

  return {
    _id,
    itensSold: salesList,
  };
};

const updateSales = async ({ id, productId, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { 'itensSold.$[sale].quantity': quantity } },
    { arrayFilters: [{ 'sale.productId': productId }] },
  );

  return {
    _id: id,
    itensSold: [{ productId, quantity }],
  };
};

module.exports = {
  getAll,
  getById,
  addSales,
  updateSales,
};
