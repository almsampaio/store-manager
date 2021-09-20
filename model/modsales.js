const { ObjectiId } = require('mongodb');
const connection = require('./connection');

const createNewSale = async (items) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: items });
  return result.ops[0];
};

const getSaleid = async (id) => {

};

module.exports = { createNewSale, getSaleid };
