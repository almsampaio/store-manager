const { ObjectId } = require('mongodb');
const connectionDB = require('./connection');

const exist = async (name) => {
    const db = await connectionDB();
    const product = await db.collection('products').findOne({ name });
    return product;
};

const getAll = async () => {
    const db = await connectionDB();
    const products = await db.collection('products').find().toArray();
    return products;
};

const getId = async (id) => {
    const db = await connectionDB();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
};

const add = async (name, quantity) => {
    const db = await connectionDB();
    const product = await db.collection('products').insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
    const db = await connectionDB();
    await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
};

const exclude = async () => {};

module.exports = { exist, getId, getAll, add, update, exclude };