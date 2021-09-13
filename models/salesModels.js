const { getConnection } = require('./connection');

const createSale = async (sales) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('sales').insertOne({ sales });

  return {
    _id,
    itensSold: sales,
  };
};

module.exports = {
  createSale,
};
