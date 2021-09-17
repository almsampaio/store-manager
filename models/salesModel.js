// const {  ObjectId } = require('mongodb');
// const connect = require('./connection');

// const getAll = async () => {
//     const sales = await connect().then((db) => db.collection('sales').find({}).toArray());
//     return sales;
// };

// const getById = async (id) => {
//     if (! ObjectId.isValid(id)) return null;
//     return connect()
//       .then((db) => db.collection('sales').findOne({ _id:  ObjectId(id) }));
// };

// const findByName = async (name) => {
//     connect()
//       .then((db) => db.collection('sales').findOne({ name }));
// };

// const create = async (name, quantity) => {
//     const db = await connect();
//     console.log('db ------- saleModel', db);
//     const [sale] = await db.collection('sales').insertOne({ name, quantity });
//     console.log('sale ------- saleModel', sale);
//     return { id: sale.insertedId, name, quantity };
// };

// const updateById = async (name, quantity, id) => {
//     const db = await connect();
//     await db.collection('sales')
//       .updateOne({ _id:  ObjectId(id) }, { $set: { name, quantity } });
//     return { id, name, quantity };
// };

// const remove = async (id) => {
//     const db = await connect();
//     const result = await db.collection('sales').deleteOne({ _id:  ObjectId(id) });
//     return { id: result.insertId, name: result.name, quantity: result.quantity };
// };

// module.exports = { 
//     create,
//     findByName,
//     getAll,
//     getById,
//     updateById,
//     remove,
// };