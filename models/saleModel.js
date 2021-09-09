// const { ObjectID } = require('mongodb');
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

module.exports = {
  create,
};
