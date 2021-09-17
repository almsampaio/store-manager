// const { ObjectId } = require('bson');
const connection = require('./connection');

const registerSaleModel = async (items) => {
  console.log('registerSaleModel on!');
  const sales = await connection().then((db) => db
  .collection('sales').insertMany([{ itensSold: items }]))
  .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  
  return sales;
};

module.exports = {
  registerSaleModel,
};