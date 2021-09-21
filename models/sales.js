const { ObjectID } = require('mongodb');
const connection = require('./connection');

const addSales = async (itensSold) => {
    const db = await connection();
    const result = await db.collection('sales').insertOne({ itensSold });
    return { _id: result.insertedId, itensSold };
};

const getBySale = async (itensSold) => {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ itensSold });
    return sale;
};

const getAllSales = async () => {
    const db = await connection();
    const sales = await db.collection('sales').find({}).toArray();
    return sales;
};

const getSalesById = async (id) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
    return sale;
};

module.exports = { addSales, getBySale, getAllSales, getSalesById };
