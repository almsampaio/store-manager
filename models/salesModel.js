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

const add = async (sale) => {
  const db = await getConnection();
  const addSale = await db.collection('sales').insertOne({ sale });
  return { _id: addSale.insertedId, itensSold: sale };
};

const update = async (id, sale) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection();
  const updateSale = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { sale } });
  
    return { id: updateSale.insertedId, itensSold: sale };
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};