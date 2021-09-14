// const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (soldItens) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{ itensSold: soldItens }]);
  return { 
    _id: Object.values(result.insertedIds).toString(),
    itensSold: soldItens,
  };
};

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

module.exports = {
  create,
  getAll,
};