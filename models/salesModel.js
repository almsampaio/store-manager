const getConnection = require('./connection');

const create = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{ itensSold }]);
  return { _id: Object.values(result.insertedId).toString(), itensSold };
};

module.exports = { create };