const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collectionName = 'sales';

const register = async (sales) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName).insertOne({ itensSold: sales });
    return { _id: result.insertedId };
  };
const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    console.log('alou');
    return null;
  } 
 
  const db = await getConnection(); 
  const sale = await db.collection(collectionName).findOne({ _id: ObjectId(id) });
  return sale;
};

const getAll = async () => {
  const db = await getConnection(); 
  const sales = await db.collection(collectionName).find({}).toArray();
  return sales;
};

const update = async (saleId, quantity, productId) => {
  if (!ObjectId.isValid(saleId)) return null;

  const db = await getConnection();
  await db.collection(collectionName)
      .updateOne({ _id: saleId, 'itensSold.productId': productId }, 
      { $set: { 'itensSold.$.std': quantity } });
  return { _id: saleId, itensSold: [{ productId, quantity }] };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection();
  await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
};
module.exports = {
  register,
  getById,
  getAll,
  update,
  remove,
  }; 