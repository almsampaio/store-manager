const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
    const db = await connection();
    const sales = await db.collection('sales').find({}).toArray();
    return sales;
}

const create = async (itensSold, quantity) => {
    connection()
    .then((db) => db.collection('sales').insertOne({itensSold, quantity}))
    .then((result) => ({ id: result.insertedId, itensSold, quantity }))
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return connnection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
}

module.exports = {
    create,
    getAll,
    getById
    };