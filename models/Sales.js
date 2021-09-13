const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { updateQuantity } = require('./Products');

const registerSale = async (itensSold) => {
  const sales = connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((sale) => sale.ops[0]);
  itensSold.forEach(({ productId, quantity }) => {
    updateQuantity(productId, quantity, 'sale');
  });
  if (!sales) return null;
  return sales;
};

const getAll = async () => {
  const sales = connection().then((db) =>
    db.collection('sales').find({}).toArray());
  if (!sales) return null;
  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = connection().then((db) =>
    db.collection('sales').findOne(new ObjectId(id)));
  if (!sale) return null;
  return sale;
};

const editSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = connection()
    .then((db) =>
      db.collection('sales').findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            itensSold,
          },
        },
        { returnDocument: 'after' },
      ))
    .then((data) => data.value);
  if (!sale) return null;
  return sale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = connection()
    .then((db) =>
      db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }))
    .then(({ value, value: { itensSold } }) => {
      itensSold.forEach(({ productId, quantity }) => {
        updateQuantity(productId, quantity, 'remove');
      });

      return value;
    });
  if (!sale) return null;
  return sale;
};

module.exports = { registerSale, getAll, getSaleById, editSale, deleteSale };
