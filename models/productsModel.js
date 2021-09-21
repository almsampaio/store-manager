const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();

    const result = await db.collection('products').find({}).toArray();

    const product = { products: result };

    return product;
};

const create = async (name, quantity) => {
    const db = await connection();

    const result = await db.collection('products').insertOne({ name, quantity });
    
    return { _id: result.insertedId, name, quantity };
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();

    const product = await db.collection('products').findOne({ _id: ObjectId(id) });

    return product;
};

const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();

    await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

const findByName = async (name) => {
    const db = await connection();

    const product = await db.collection('products').findOne({ name });

    return product;
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
    findByName,
};
