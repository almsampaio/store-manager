const connect = require('./connection');

const create = async (sale) => {
  const db = await connect();
  console.log('sales model');
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
};

module.exports = { create };
