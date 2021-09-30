const connectionDb = require('./connection');

const getAll = async () => {
  const allSales = await connectionDb()
    .then((db) => db.collection('sales').find({}).toArray());
  return allSales;
};

module.exports = {
  getAll,
};
