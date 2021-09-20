const { ObjectID } = require('bson');
const connection = require('./mongoConnection');

const create = async (productsSold) =>
  connection().then((db) =>
  db.collection('sales').insertOne({
      itensSold: productsSold,
  }));

const getSales = async () =>
  connection().then((db) => 
  db.collection('sales').find().toArray());

const getSalesById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return sale;
};

module.exports = {
  create,
  getSales,
  getSalesById,
};