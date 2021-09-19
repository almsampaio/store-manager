const getConnection = require('./connections');

const createSale = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return { _id: result.insertedId, itensSold };
};

const getProductsSold = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').findOne({ itensSold });
  return result;
};

module.exports = {
  createSale,
  getProductsSold,
};
