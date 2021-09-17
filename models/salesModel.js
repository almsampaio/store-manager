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

const add = async (itensSold) => {
  const db = await getConnection();
  const addSale = await db.collection('sales').insertOne({ itensSold });
  return { _id: addSale.insertedId, itensSold };
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection();
  const updateSale = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    console.log(updateSale);
  
    return { _id: id, itensSold };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const db = await getConnection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};