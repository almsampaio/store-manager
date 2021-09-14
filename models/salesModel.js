const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const sales = await salesCollection
    .find()
    .toArray();

  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const salesCollection = await connection()
  .then((db) => db.collection('sales'));

  const sale = await salesCollection
    .findOne({ _id: ObjectId(id) });
    return sale;
};

const create = async (arr) => {
  const connectionDb = await connection();

  const newSale = await connectionDb.collection('sales')
  .insertOne({ itensSold: arr });
  return newSale.ops[0];
};

const update = async (id, arr) => {
  if (!ObjectId.isValid(id)) return false;
  const [{ productId, quantity }] = arr;

  const connectionDb = await connection();

  await connectionDb.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } });

  const newProduct = {
    _id: id,
    itensSold: [{
    productId,
    quantity,
    }],
  };

  return newProduct;
};

const drop = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const connectionDb = await connection();

  const deletedSale = await connectionDb.collection('sales')
  .deleteOne({ _id: ObjectId(id) });

  return deletedSale;
};

module.exports = {
  create,
  getAll,
  getSaleById,
  update,
  drop,
};
