const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const productsModel = require('./productsModel');

const getAll = async () => {
    const db = await connection();

    const result = await db.collection('sales').find({}).toArray();
    const sales = result.map(({ _id, sale }) => ({ _id, itensSold: [...sale] }));
    return sales;
};

const create = async (sale) => { 
    const db = await connection();

    const result = await db.collection('sales').insertOne({ sale });

    const itensSold = sale.map((e) => ({ productId: e.productId, quantity: e.quantity }));

    return { _id: result.insertedId, itensSold };
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();

    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

    return sale;
};

const update = async (id, itensSold) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();

    await db.collection('sales')
        .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }, { upsert: true });

    const updatedSale = await getById(id);

    return { _id: id, updatedSale };
};

const remove = async (id) => {
    const db = await connection();

    await db.collection('sales').deleteOne({ _id: ObjectId(id) });
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
    update,
};