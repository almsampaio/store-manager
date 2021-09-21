const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold });
  return { _id: newSale.insertedId, itensSold };
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold } },
  );

  return getById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
