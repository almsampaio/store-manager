const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
    const products = await connect().then((db) => db.collection('products').find({}).toArray());
    return products;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return connect()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
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

const updateById = async (name, quantity, id) => {
    const db = await connect();
    await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { id, name, quantity };
};

module.exports = { 
    create,
    findByName,
    getAll,
    getById,
    updateById,
};