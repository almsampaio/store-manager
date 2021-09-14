const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'sales';

exports.getAll = async () => {
  const db = await connection();

  const sales = await db.collection(COLLECTION).find().toArray();

  return sales;
};

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const sale = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });

  return sale;
};

exports.createSale = async (salesArr) => {
  const db = await connection();

  const sales = await db.collection(COLLECTION).insertOne({ itensSold: salesArr });

  return {
    _id: sales.insertedId,
    itensSold: salesArr,
  };
};
