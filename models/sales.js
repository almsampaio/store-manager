const { ObjectId } = require('mongodb');
const connection = require('./connection');

const postSales = async (data) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: data }))
  .then((e) => e.ops[0]);

const getAllSales = async () => connection().then((db) => db.collection('sales').find().toArray());

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const putSales = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return { _id: id, itensSold };
};

const deleteSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  deleteSales,
  getAllSales,
  getSalesById,
  putSales,
  postSales,
};
