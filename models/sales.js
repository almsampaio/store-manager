const connection = require('./connection');

const create = async (itensSold) => {
  const itemCreate = await connection()
    .then((db) => db.collection('sales').insertMany([{ itensSold }]));
  return {
    _id: Object.values(itemCreate.insertedId).toString(),
    itensSold,
  };
};

module.exports = {
  create,
};