const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray());

const create = async (sale) => {
 const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ sale }));

  return {
    _id: newSale.insertedId,
    itensSold: sale,
  };
};

module.exports = {
  getAll,
  create,
};
