const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const productsModel = require('./productsModel');

const getAll = async () => {
    const db = await connection();

    const sales = await db.collection('sales').find({}).toArray();

    return sales;
};

const create = async (sale) => { 
    const db = await connection();
    console.log(sale);

    const result = await db.collection('sales').insertOne({ sale });

    const itensSold = sale.map((e) => ({ productId: e.productId, quantity: e.quantity }));

    return { _id: result.insertedId, itensSold };
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    return connection()

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
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
    findProductId,
};