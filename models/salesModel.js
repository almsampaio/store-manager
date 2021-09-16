// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itens) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: itens }));
  console.log(result);
  return (result.ops[0]);
  };

module.exports = {
 createSales,
};