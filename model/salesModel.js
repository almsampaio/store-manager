const connection = require('./connection');

module.exports.createSales = (productData) => (connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: productData }))
  .then((result) => result.ops[0]))
  .catch((error) => {
    console.log('Unable to create sales ===', error);
    throw new Error(error);
  });
