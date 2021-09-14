// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((sales) => (({ _id: sales.insertedId, itensSold })));
/*
const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => 
   sales.map(({ _id, itensSold }) => 
    ({
        _id,
        itensSold,
    })));
*/

module.exports = {
    create,
 //   getAll,
};