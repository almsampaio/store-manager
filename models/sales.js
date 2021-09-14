const connection = require('./connection');

const registerSales = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ itensSold }));
  return { _id: insertedId, itensSold };
};

module.exports = { registerSales };
