const connection = require('./connection');

const COLLECTION_NAME = 'sales';

// REQUISITO 5 _______________________________________________________________________//

const createSale = async (sales) => {
  const db = await connection();
  const addSales = await db.collection(COLLECTION_NAME).insertOne({ itensSold: sales });
  return addSales.ops[0];
};

// __________________________________________________________________________________//

module.exports = {
  createSale,
};
