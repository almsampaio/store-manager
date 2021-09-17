const connection = require('./connection');

const create = async (itensSoldArray) => {
  const db = await connection();
  const insertedSale = await db.collection('sales').insertOne({ itensSoldArray });
  const sales = { _id: insertedSale.insertedId, itensSold: itensSoldArray };
  return sales;
};

module.exports = {
  create,
};
