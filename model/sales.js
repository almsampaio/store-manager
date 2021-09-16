const connection = require('./connection');

async function createSale(products) {
  const value = await connection()
    .then((db) => db.collection('sales').insertOne(
      { itensSold: products },
    ));
  return value.ops[0];
}

module.exports = {
  createSale,
};
