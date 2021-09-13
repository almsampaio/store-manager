const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () => {
  const sales = await connection().then((db) => db
  .collection('sales').find({}).toArray())
  .catch((err) => console.log(err));
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const sale = await connection().then((db) => db
  .collection('sales').findOne({ _id: ObjectId(id) }))
  .then((response) => {
    console.log(response, 'getById sales model');
    return response;
  }).catch((error) => console.log(error));

  return sale;
};

const create = async (items) => {
  console.log(items, 'salesModel');

  const db = await connection();
  const newSale = await db.collection('sales').insertMany([{ itensSold: items }]);
  items.forEach(async ({ productId, quantity }) => {
    await db.collection('products').findOneAndUpdate({
      _id: ObjectId(productId) }, { $inc: { quantity: -quantity } });
  });

  return {
    _id: Object.values(newSale.insertedIds).toString(),
    itensSold: items,
  };
  // .then((result) => (
  //   // result.ops[0]
  //   { _id: result.insertedId, itensSold: items }
  // )).catch((err) => console.log(err));

  // return newSale;
};

module.exports = {
  getAll,
  getById,
  create,
};
