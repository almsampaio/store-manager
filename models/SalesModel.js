const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'sales';

const create = async (productsList) => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const newSale = await SalesCollection
    .insertMany([{ itensSold: [...productsList] }]);

  return newSale.ops[0];
};

const getAll = async () => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const salesList = await SalesCollection
    .find().toArray();

  return salesList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundSale = await SalesCollection
    .findOne({ _id: ObjectId(id) });

  return foundSale;
};

const update = async (saleId, productsList) => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const updatedSale = await SalesCollection
    .findOneAndUpdate(
      { _id: ObjectId(saleId) },
      { $set: { itensSold: productsList } },
      { returnOriginal: false },
    );

  console.log(updatedSale.value);

  return updatedSale.value;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const removedSale = await SalesCollection
    .findOne({ _id: ObjectId(id) });

  await SalesCollection
    .deleteOne({ _id: ObjectId(id) });

  return removedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
