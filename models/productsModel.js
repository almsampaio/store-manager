// const { ObjectId } = require('mongodb');
const connect = require('./connection');

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
};