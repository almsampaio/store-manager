const connection = require('./connection');

const create = (sales) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
  .then((result) => result.ops[0]);

module.exports = {
  create,
};
