const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const COLLECTION_SALES = 'sales';

const create = async (arraySold) => {
  const salesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection(COLLECTION_SALES));
  
    const { insertedId: _id } = await salesCollection.insertOne({
      itensSold: arraySold,
    });

    return {
      _id,
      itensSold: arraySold,
    };
};

const getAll = async () => {
  const salesCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_SALES));

  const sales = await salesCollection.find().toArray();

  return { sales };
};

const getById = async (id) => {
  const salesCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_SALES));

  if (!ObjectId.isValid(id)) return null;

  const sales = await salesCollection.findOne({ _id: ObjectId(id) });

  if (!sales) return null;

  return { sales };
};

module.exports = {
  getById,
  getAll,
  create,
};
