const { ObjectId } = require('mongodb');
const connectionDB = require('./connection');

const existingName = async (name) => {
    const db = await connectionDB();
    const product = await db.collection('products').findOne({ name });
    return product;
};

const existingId = async (id) => {
    if (!ObjectId.isValid(id)) { return null; }
    const db = await connectionDB();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
};

const getAll = async () => {
    const db = await connectionDB();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

const getId = async (id) => {
    const db = await connectionDB();
    const idSale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return idSale;
};

const add = async (salesArray) => {
    const db = await connectionDB();
    const itensSold = salesArray;
    const sale = await db.collection('sales').insertOne({ itensSold });
    return { _id: sale.insertedId, itensSold };
};

const update = async (id, salesArray) => {
    const db = await connectionDB();
    const itensSold = salesArray;
    await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    return { _id: id, itensSold };
};

const exclude = async (id) => {
    const db = await connectionDB();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    await db.collection('products').deleteOne({ _id: ObjectId(id) });

    return product;
};

module.exports = { existingName, existingId, getId, getAll, add, update, exclude }; 