const getConnection = require('./connection');

const create = async (itensSold) => {
  const db = await getConnection();
  const resultDb = await db.collection('sales').insertMany([{ itensSold }]);
  return { _id: Object.values(resultDb.insertedIds).toString(), itensSold };
};

module.exports = { create };