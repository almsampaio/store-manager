const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createSales = async (itensSold) => 
   getConnection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));
   
    const getAllSales = async () => {
    const db = await getConnection(); 
    const saleslist = await db.collection('sales').find({}).toArray();
    const salesAll = { sales: saleslist };
    return salesAll;
  }; 
  const getById = async (id) => {
    const idSize = 24;
    if (id.length < idSize) return null;
    const db = await getConnection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
  };
module.exports = {
    createSales,
    getAllSales,
    getById,
};