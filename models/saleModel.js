const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertMany([{
      itensSold,
    }]));
  // console.log(sale);
  // console.log(arrayOfSales);

  return {
    _id: Object.values(sale.insertedIds).toString(),
    itensSold,
  };
};

const getAll = async () => {
  const itensSold = connection()
    .then((db) => db.collection('sales').find().toArray());
  return itensSold;
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const sales = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectID(id) }));

  return sales;
};

module.exports = {
  create,
  getAll,
  findById,
};
