const connection = require('./connection');

const add = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then((response) => response.ops[0]);

module.exports = {
  add,
};
