const connection = require('./connection');

const create = async (sale) => {
  const operation = await connection()
    .then((db) => db.collection('products').insertOne({ itensSold: sale }))
      .then((result) => result);

  return operation;
};

module.exports = {
  create,
};
