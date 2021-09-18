const { ObjectID } = require('bson');
const connections = require('./connections');

const postSale = async (soldItems) => {
  const db = await connections();

  const sale = await db.collection('sales').insertMany([{ itensSold: soldItems }]);
  return { _id: Object.values(sale.insertedIds).toString(), itensSold: soldItems };
};

const getAllSales = async () => {
  const db = await connections();

  const allSales = await db.collection('sales').find({}).toArray();
  return { sales: allSales };
};

const getSalesByID = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connections();

  const salesByID = await db.collection('sales').findOne({ _id: ObjectID(id) });
  if (!salesByID) return false;
  return salesByID;
};

const updateSalesByID = async (id, toChangeSales) => {
  if (!ObjectID.isValid(id)) return 'Sale not Found';
  const db = await connections();
  
  await db.collection('sales').updateOne(
    { _id: ObjectID(id) }, { $set: { toChangeSales } },
  );
  return { _id: id, itensSold: toChangeSales };
};

const deleteSaleByID = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connections();
  const deleteSale = await db.collection('sales').findOneAndDelete({ _id: ObjectID(id) });
  if (!deleteSale) return false;
  return deleteSale.value;
};

module.exports = {
  postSale,
  getAllSales,
  getSalesByID,
  updateSalesByID,
  deleteSaleByID,
};
