const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (data) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: data }));

  return {
    _id: result.insertedId,
    itensSold: data,
  };
};

const getAll = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const findById = async (id) =>
  connection().then((db) =>
    (ObjectID.isValid(id)
      ? db
          .collection('sales')
          .find({ _id: ObjectID(id) })
          .toArray()
      : null));

const update = async (id, data) =>
  connection()
    .then((db) =>
      db
        .collection('sales')
        .updateOne({ _id: ObjectID(id) }, { $set: { itensSold: data } }))
    .then(() => ({ _id: id, itensSold: data }));

const deleteSales = async (id) =>
  connection().then((db) =>
    (ObjectID.isValid(id)
      ? db.collection('sales').findOneAndDelete({ _id: ObjectID(id) })
      : false));

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteSales,
};
