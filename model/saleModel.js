const { ObjectID } = require('bson');

const connection = require('./connection');

const create = async (itensSoldArray) => {
  const db = await connection();
  const insertedSale = await db.collection('sales').insertOne({ itensSold: itensSoldArray });
  const sales = { _id: insertedSale.insertedId, itensSold: itensSoldArray };
  return sales;
};

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  return db.collection('sales').findOne(ObjectID(id));
};

const update = async (id, updatedItensSoldArray) => {
  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectID(id) }, { $set: { itensSold: updatedItensSoldArray } });
  return { _id: ObjectID(id), itensSold: updatedItensSoldArray };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
