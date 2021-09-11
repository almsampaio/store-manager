const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
    const db = await connection();
    const products = await db.collection('products').find({}).toArray();
    return products;
};

const create = async (name, quantity) => {
    connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((result) => ({ id: result.insertedId, name, quantity }))
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return connnection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return connnection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
create,
getAll,
getById,
remove
};
