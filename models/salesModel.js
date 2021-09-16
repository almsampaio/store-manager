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
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
};

const getAll = async () => {
    const db = await connectionDB();
    const products = await db.collection('products').find().toArray();
    return products;
};

const getId = async (id) => {
    const db = await connectionDB();
    const idProduct = await db.collection('products').findOne({ _id: ObjectId(id) });
    return idProduct;
};

const add = async (salesArray) => {
    const db = await connectionDB();
    const itensSold = salesArray;
    const sale = await db.collection('sales').insertOne({ itensSold });
    return { _id: sale.insertedId, itensSold };
};

const update = async (id, name, quantity) => {
    const db = await connectionDB();
    await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
};

const exclude = async (id) => {
    const db = await connectionDB();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    await db.collection('products').deleteOne({ _id: ObjectId(id) });

    return product;
};

module.exports = { existingName, existingId, getId, getAll, add, update, exclude }; 