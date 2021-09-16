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

const add = async (name, quantity) => {
    const db = await connectionDB();
    const product = await db.collection('products').insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

const update = async () => {};

const exclude = async () => {};

module.exports = { exist, getAll, add, update, exclude };