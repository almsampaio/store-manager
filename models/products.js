const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    return products;
};

const addProduct = async (name, quantity) => {
    const db = await connection();
    const result = await db.collection('products').insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
};

const findName = async (name) => {
    const db = await connection();
    const product = db.collection('products').findOne({ name });
    return product;
};

const getById = async (id) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await connection();
    const product = await db.collection('products').findOne({ _id: ObjectID(id) });
    return product;
};

const update = async (id, data) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await connection();
    await db.collection('products').updateOne(
        { _id: ObjectID(id) }, { $set: data }, { upsert: true },
    );
    const product = await getById(id);
    return product;
};

const remove = async (id) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await connection();
    const result = await db.collection('products').deleteOne({ _id: ObjectID(id) });
    return result;
};

module.exports = { addProduct, getAll, findName, getById, update, remove };
