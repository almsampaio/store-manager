// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
    const products = await connect().then((db) => db.collection('products').find({}).toArray());
    return products;
};

const findByName = async (name) => {
    connect()
      .then((db) => db.collection('products').findOne({ name }));
};

const create = async (name, quantity) => {
    const db = await connect();
    const product = await db.collection('products').insertOne({ name, quantity });
    return { id: product.insertedId, name, quantity };
};

module.exports = { 
    create,
    findByName,
    getAll,
};