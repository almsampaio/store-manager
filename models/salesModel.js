const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{ itensSold }]);
  itensSold.forEach(async ({ productId, quantity }) => {
    await db.collection('products')
      .findOneAndUpdate({ _id: ObjectId(productId) },
        { $inc: { quantity: -quantity } });
  });
  return { _id: Object.values(result.insertedIds).toString(), itensSold };
};

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const { itensSold } = await db.collection('sales').findOne({ _id: ObjectId(id) });
  itensSold.forEach(async ({ productId, quantity }) => {
    await db.collection('products')
      .findOneAndUpdate({ _id: ObjectId(productId) },
        { $inc: { quantity } });
  return db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

const editById = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('sales')
  .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: ObjectId(id), itensSold };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  editById,
};