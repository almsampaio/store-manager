const connections = require('./connections');

const postSale = async (soldItems) => {
  const db = await connections();

  const sale = await db.collection('sales').insertMany([{ itensSold: soldItems }]);
  return { _id: Object.values(sale.insertedIds).toString(), itensSold: soldItems };
};

module.exports = {
  postSale,
};
