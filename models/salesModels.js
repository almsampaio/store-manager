const connection = require('./connection');
const { ObjectID } = require('mongodb');

const registerSales = async (salesArray) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: salesArray }));

  return sales.ops[0];
};

const listAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return sales;
};

const listSaleId = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: id }));

  return sale;
};

const editSale = async (id, productId, quantity) => {
  const saleEdited = await connection()
    .then((db) => db.collection('sales').updateOne({ _id: id },
      { $set: { 'itensSold.$[item].quantity': quantity } },
      { arrayFilters: [{'item.productId': productId}]}));
  return saleEdited;
};

const deleteSale = async (id) => {
  console.log(id);
  const sale = await listSaleId(id);
  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectID(id) }))
    .then(() => sale);

};

module.exports = {
  registerSales,
  listAll,
  listSaleId,
  editSale,
  deleteSale,
};
