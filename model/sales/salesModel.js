const connection = require('../connection');

const createModel = async (itensSold) => {
  const db = await connection();
  const insertSales = await db.collection('sales')
    .insertOne({ itensSold });
  
  const result = { 
    _id: insertSales.insertedId, 
    itensSold,
  };
  
  return { result };
};

module.exports = { createModel };