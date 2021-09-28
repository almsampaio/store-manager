const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAllSales = async () => {
    const db = await Connection();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

const getById = async (id) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await Connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
    return sale;
  };

const createSales = async (itenSales) => {
    const db = await Connection();
    const { ops } = await db.collection('sales').insertOne({ itensSold: itenSales });
    return ops[0];
}; 

module.exports = { getAllSales, getById, createSales };