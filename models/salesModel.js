const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async (sales) => {
  const salesCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('sales'));

  const itensSold = [];
  sales.forEach((sale) => {
    itensSold.push({ productId: sale.productId, quantity: sale.quantity });
  });
  const { insertedId: _id } = await salesCollection.insertOne({ itensSold });
  return {
    _id,
    itensSold,
  };
};

const getById = async (_id) => {
  const salesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

    const sale = await salesCollection.findOne({ _id: ObjectId(_id) });
    return sale;
};

const getAll = async () => {
  const salesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));
  
  return salesCollection.find().toArray();
};

const update = async (_id, sales) => {
  const [{ productId, quantity }] = sales;
  const salesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));
  await salesCollection
    .updateOne({ _id: ObjectId(_id) }, { $set: { itensSold: [{ productId, quantity }] } });
  return { _id, itensSold: [{ productId, quantity }] };
};

module.exports = {
  create,
  getById,
  getAll,
  update,
};
