const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (itensSold) => {
    const db = await connection();
    const result = await db.collection('sales').insertOne({ itensSold });
    return { _id: result.insertedId, itensSold };
};

const getSales = async () => {
  const db = await connection();
  const get = db.collection('sales').find().toArray();
  return get;
};

const getIdSales = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findByIdSales = db.collection('sales').findOne(ObjectId(_id));
  return findByIdSales;
};

module.exports = { createSale, getSales, getIdSales };
