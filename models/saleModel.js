const { ObjectID } = require('bson');
const getConnection = require('./connection');

const errMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format' },
  statusCode: 422 };

const create = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{ itensSold }]);
  const { _id } = result.ops[0];
  return ({ _id, itensSold });
};

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return sale;
};

const update = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('sales')
    .updateOne({ id: ObjectID(id) }, { $set: { itensSold } });
  return ({ id, itensSold });
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) return errMessage;
  const db = await getConnection();
  const findSale = await db.collection('sales').findOne({ _id: ObjectID(id) });
  if (!findSale) return errMessage;
  await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return findSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
