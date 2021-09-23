const connection = require('./connection');

const create = async (sale) => {
  const operation = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
      .then((result) => result.ops[0]);

  return operation;
};

module.exports = {
  create,
};
