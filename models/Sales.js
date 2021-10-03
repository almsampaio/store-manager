const { ObjectId } = require('mongodb');
const connection = require('./connection');

const Products = require('./Products');

async function createSales(sales) {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId: _id } = await salesCollection
    .insertOne({ sales });

  sales.forEach(async (sale) => {
    await Products.updateProductQuantityOperation(ObjectId(sale.productId), -sale.quantity);
  });

  return {
    _id,
    itensSold: sales,
  };
}

async function getSales() {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return sales;
}

async function getSaleById(id) {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: id }));

    return sale;
}

async function editSale(id, items) {
  await connection()
    .then((db) => db.collection('sales')
    .findOneAndUpdate({ _id: id }, { $set: { itensSold: items } }));
  
  const editedSale = await getSaleById(id);
  return editedSale;
}

async function deleteSale(id) {
  const { sales } = await getSaleById(ObjectId(id));
  sales.forEach(async (item) => {
    await Products.updateProductQuantityOperation(ObjectId(item.productId), item.quantity);
  });
  const deletedSale = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: id }));

  return deletedSale;
}

module.exports = {
  createSales,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};
