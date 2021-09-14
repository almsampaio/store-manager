const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // estou validadno o id, nao entendi direito
  
  const db = await getConnection();
  const product = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  getAll,
  getById,
};