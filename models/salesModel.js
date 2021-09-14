const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = db.collection('sales').find().toArray();
  return result;
};

const create = async (sale) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold: sale });
  return { _id: insertedId, itensSold: sale };
};

const update = async (id, prodId, qtd) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectID(id) },
    { $set: { 'itensSold.$[element].quantity': qtd } },
    { arrayFilters: [{ 'element.productId': prodId }] });
  const result = await getById(ObjectID(id));
  return result;
};

const remove = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return true;
};

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
};
