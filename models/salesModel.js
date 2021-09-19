const mongoConnection = require('./connection');

const create = async (sales) => {
  const salesCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('sales'));

  const itensSold = [];
  sales.forEach((sale) => {
    itensSold.push({ productId: sale.productId, quantity: sale.quantity });
  });
  const { insertedId: _id } = await salesCollection.insertOne({ itensSold });
  return {
    _id,
    itensSold,
  };
};

module.exports = {
  create,
};
