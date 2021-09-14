const { ObjectId } = require('mongodb');
const connectionDB = require('./connectionDB');

const getAll = async () => {
  const getAllSales = await connectionDB()
    .then((db) => db.collection('sales').find({}).toArray());
  return getAllSales;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const salesData = await connectionDB()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  
  if (!salesData) return null;
  return salesData;
};

const create = async (salesArray) => {
  const { ops: newSales } = await connectionDB()
    .then((db) => db.collection('sales').insertOne({ itensSold: salesArray }));
  return newSales[0];
};

module.exports = {
  getAll,
  findById,
  create,
};