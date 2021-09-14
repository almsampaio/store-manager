const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((sales) => (({ _id: sales.insertedId, itensSold })));

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => 
   sales.map(({ _id, itensSold }) => 
    ({
        _id,
        itensSold,
    })));

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const sale = await connection().then((db) => 
        db.collection('sales').findOne({ _id: ObjectId(id) }));

    if (!sale) return null;

    return sale;
};

const update = async (id, itensSold) => {
    if (!ObjectId.isValid(id)) return null;

    const sale = await connection().then((db) =>
        db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

    if (!sale) return null;

    return { _id: id, itensSold };
};

module.exports = {
    create,
    getAll,
    getById,
    update,
};