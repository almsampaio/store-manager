const connection = require('./conection');

const createSale = (params) => (
  connection()
    .then((db) => (db.collection('sales').insertOne(params)))
    .then((result) => ({ _id: result.insertedId, ...params }))
);

module.exports = {
  createSale,
};
