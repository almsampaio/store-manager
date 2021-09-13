const mongoConnection = require('./connection');

const createSale = async (sales) => {
  const connection = await mongoConnection();
  const result = await connection.collection('sales').insertOne({ itensSold: sales });

  return result.ops[0];

  // Reference for .ops: https://stackoverflow.com/questions/40766654/node-js-mongodb-insert-one-and-return-the-newly-inserted-document
};

module.exports = {
  createSale,
};
