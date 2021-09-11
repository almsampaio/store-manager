const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { remove } = require('./productsModel');

const getAll = async () => {
    const db = await connection();

    const sales = await db.collection('sales').find({}).toArray();

    return sales;
}

const create = async (itensSold) => {
    connection()

    .then((db) => db.collection('sales').insertOne(itensSold))

    .then((result) => ({ id: result.insertedId, itensSold }))
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    return connnection()

    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    return connection()

    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

const findProductId = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    return connection()

    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
    findProductId,
};