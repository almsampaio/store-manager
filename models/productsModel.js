// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, quantity) => {
    const db = await connect();
    const product = await db.collection('product').insertOne({ name, quantity });
    return { id: product.insertedId, name, quantity };
};

module.exports = { create };