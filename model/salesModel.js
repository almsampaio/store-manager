const { ObjectId } = require('bson');
const connection = require('./connection');

const errMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format' },
  statusCode: 422 };

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertMany([{ itensSold }]);
  const { _id } = result.ops[0];
  return ({ _id, itensSold });
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const updateSales = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales')
    .updateOne({ id: ObjectId(id) }, { $set: { itensSold } });
  return ({ id, itensSold });
};

const deleteSales = async (id) => {
  if (!ObjectId.isValid(id)) return errMessage;
  const db = await connection();
  const findSale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  if (!findSale) return errMessage;
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return findSale;
};

module.exports = {
  create,
  getAllSales,
  getSaleById,
  updateSales,
  deleteSales,
};

// Para a função create usei como ref o repositório do colega rafael Geronimo