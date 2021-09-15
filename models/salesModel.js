const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'sales';

const getAll = async () => (
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
);

const findById = async (id) => (
  connection()
    .then((db) => db.collection(collectionName).findOne(new ObjectId(id)).toArray())
);

const deleteById = async (id) => (
  connection()
    .then((db) => db.collection(collectionName).deleteOne(new ObjectId(id)))
);

const create = async (itensSold) => {
  const db = await connection();
  const saleCreated = await db.collection(collectionName).insertOne({ itensSold })
    .then((result) => ({ _id: result.insertedId, itensSold }))
    .catch((err) => console.log(err));
  return saleCreated;
};

const update = async (id, itensSold) => (
  connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: itensSold }))
    .then(() => ({ _id: id, itensSold }))
);

module.exports = { getAll, findById, deleteById, create, update }; 