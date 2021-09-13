const { getConnection } = require('./connection');

const createSale = async (sales) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('sales').insertOne({ sales });

  return {
    _id,
    itensSold: sales,
  };
};

const getAllSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find();
  return sales;
};

module.exports = {
  createSale,
  getAllSales,
};
