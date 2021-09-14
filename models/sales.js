const connection = require('./connection');

const createSale = async (sales) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne(sales);
  return (newSale.ops[0]);
};

module.exports = { createSale };