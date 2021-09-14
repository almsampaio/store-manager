const connection = require('./connection');

const create = async (sale) => {
  const newSale = connection()
    .then((db) => db.collection('sales').insertOne(sale));

  return {
    _id: newSale.insertedId,
    itensSold: sale,
  };
};

module.exports = {
  create,
};
