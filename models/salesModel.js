const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const productsModel = require('./productsModel');

const getAll = async () => {
    const db = await connection();

    const result = await db.collection('sales').find({}).toArray();
    const sales = result.map(({ _id, sale }) => ({ _id, itensSold: [...sale] }));
    return sales;
};

// const getAll = async () => {
//     return connection()
//       .then((db) => db.collection('sales').find().toArray())
//       .then((sales) =>
//         sales.map(({ _id, itensSold }) =>
//          ( { _id, itensSold: itensSold
//             .map((item) => ({ productId: item.productId,
//         quantity: item.quantity }))})
//         ))
//   }

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