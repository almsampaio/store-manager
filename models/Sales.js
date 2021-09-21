const { ObjectId } = require('mongodb');
const Connection = require('./connection');

const COLLECTION_NAME = 'sales';

exports.create = async (salesInfo) => {
  const db = await Connection();
  const saleCollection = await db.collection(COLLECTION_NAME);
  const createdSales = await saleCollection.insertOne({ itensSold: salesInfo });
  
  return createdSales;
};

exports.getAll = async () => {
  const db = await Connection();
  const saleCollection = await db.collection(COLLECTION_NAME);
  const sales = await saleCollection.find().toArray();

  return sales;
};

exports.getById = async (id) => {
  const db = await Connection();
  const saleCollection = await db.collection(COLLECTION_NAME);
  const [sale] = await saleCollection.find({ _id: ObjectId(id) }).toArray();

 return sale;
};
