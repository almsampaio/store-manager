const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return result.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const findById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

const update = async (id, itensSold) => {
  // console.log(id, itensSold);
  const db = await connection();
  const result = await db
    .collection('sales')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } });
    // console.log('LOG MODEL', result);
  return result;
};

const remove = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  console.log('LOG MODEL', result);
  return result;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
