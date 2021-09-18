const { ObjectId } = require('mongodb');
const Connection = require('../../config/databaseMongo');

const getAll = async () => {
  const mongo = await Connection();
  return mongo.collection('sales')
    .find()
    .toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const mongo = await Connection();
  return mongo.collection('sales').findOne({ _id: ObjectId(id) });
};

const create = async (products) => {
  const mongo = await Connection();
  const result = await mongo.collection('sales').insertMany([
    {
      itensSold: [...products],
    },
  ]);

  const [salesSaved] = result.ops;

  return { _id: result.insertedIds[0], ...salesSaved };
};

module.exports = {
  getAll,
  findById,
  create,
};
