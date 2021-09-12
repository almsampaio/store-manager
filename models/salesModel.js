const getConnection = require('./connection');

const registerSales = async (sales) => {
  const db = await getConnection();
  const addOrder = await db.collection('sales').insertOne({ itensSold: sales });

  return addOrder.ops[0];
};

module.exports = {
  registerSales,
};
