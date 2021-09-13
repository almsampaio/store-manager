const { ObjectID } = require('bson');
const connection = require('./connection');

const addNew = async (payload) => {
  const salesCollection = await connection.getConnection()
    .then((db) => db.collection('sales'));

  const result = await salesCollection.insertOne({ itensSold: payload });
  return { _id: result.insertedId, itensSold: payload };
};

const getAll = async () => {
  const salesCollection = await connection.getConnection()
    .then((db) => db.collection('sales'));

  const result = await salesCollection.find().toArray();
  return { sales: result };
};

const getById = async (payload) => {
  const salesCollection = await connection.getConnection()
    .then((db) => db.collection('sales'));

  const { id } = payload;
  if (!ObjectID.isValid(id)) return { message: 'id invalido' };
  const result = await salesCollection.findOne({ _id: ObjectID(id) });
  return result;
};

const updateOne = async (payload, id) => {
  const salesCollection = await connection.getConnection()
    .then((db) => db.collection('sales'));

  if (!ObjectID.isValid(id)) return { message: 'id invalido' };
  const result = await salesCollection.findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: { itensSold: payload } },
    { returnDocument: 'after' },
  );
  return result.value;
};

module.exports = {
  addNew,
  getAll,
  getById,
  updateOne,
};
