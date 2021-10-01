const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAllSales = async () => {
    const db = await Connection();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

const getById = async (id) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await Connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
    return sale;
  };

const createSales = async (itenSales) => {
    const db = await Connection();
    const { ops } = await db.collection('sales').insertOne({ itensSold: itenSales });
    return ops[0];
}; 

const updateSales = async (id, itensSold) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await Connection();
    await db.collection('sales')
    .updateOne({ _id: ObjectID(id) }, { $set: { itensSold } });
    const sale = await getById(id);
    return sale;
  }; 

  const deleteSales = async (id) => {
    if (!ObjectID.isValid(id)) return null;
    const db = await Connection();
    await db.collection('sales').deleteOne({ _id: ObjectID(id) });
    return true;
  };

  const getByItensSold = async (itensSold) => {
    const db = await Connection();
    const sale = await db.collection('sales').findOne({ itensSold });
    return sale;
  };

module.exports = { getAllSales, getById, createSales, updateSales, deleteSales, getByItensSold };
