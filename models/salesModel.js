const connection = require('./connection');

const create = (sale) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then((result) => result.ops[0]);

module.exports = { 
  create,
};
