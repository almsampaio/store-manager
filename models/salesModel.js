const connection = require('./connection');

const create = async (sale) => {
 const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ sale }));

  return {
    _id: newSale.insertedId,
    itensSold: sale,
  };
};

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray());

module.exports = {
  create,
  getAll,
};
