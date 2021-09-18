const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
    const db = await connect();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return false;
    const sale = await connect()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
      console.log('sale - - - - MODEL', sale);
      if (!sale) return false;
      return sale;
};

const create = async (array) => {
    const db = await connect();
    const sale = await db.collection('sales').insertOne({ itensSold: array });
    return sale.ops[0];
};

const updateById = async (array, id) => {
    if (!ObjectId.isValid(id)) return null;
    const [{ productId, quantity }] = array;

    const db = await connect();
    await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } });
    const updatedsale = { _id: id,
        itensSold: [{ productId, quantity }] };
    return updatedsale;
};

const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connect();
    console.log('db - - - - MODEL', db);
    const result = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
    console.log('result - - - - MODEL', result);
    return result;
};

module.exports = { 
    create,
    getAll,
    getById,
    updateById,
    remove,
};