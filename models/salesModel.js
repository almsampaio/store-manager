const connect = require('./connection');

const create = async (sale) => {
  const db = await connect();
  const product = await db.collection('sales').insertOne({ itensSold: sale });
  return product.ops[0];
};

module.exports = { create };
