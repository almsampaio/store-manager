const { ObjectID } = require('bson');
const connection = require('./mongoConnection');

const create = async (productSold) =>
  connection().then((db) =>
  db.collection('sales').insertOne({
      itensSold: productSold,
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

const update = async (id, productSold) => {
  if (!ObjectID.isValid(id)) return null;
  
  return connection().then((db) =>
    db.collection('sales')
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { itensSold: productSold } }));
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  
  return connection().then((db) =>
    db.collection('sales')
    .deleteOne({ _id: ObjectID(id) }));
};

module.exports = {
  create,
  getSales,
  getSalesById,
  update,
  remove,
};