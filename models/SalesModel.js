const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (productsList) => {
  const Sales = await connection().then((db) => db.collection('sales'));
  const newSale = await Sales.insertMany([{ itensSold: [...productsList] }]);

  return newSale.ops[0];
};

const getAll = async () => {
  const Sales = await connection().then((db) => db.collection('sales'));
  const salesList = await Sales.find().toArray();

  return salesList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const Sales = await connection().then((db) => db.collection('sales'));
  const sale = await Sales.findOne({ _id: ObjectId(id) });

  return sale;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const update = async (saleId, productsList) => {
  const Sales = await connection().then((db) => db.collection('sales'));

  const sale = await Sales
    .findOneAndUpdate(
      { _id: ObjectId(saleId) },
      { $set: { itensSold: productsList } },
      { returnOriginal: false },
    );

  return sale.value;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const Sales = await connection().then((db) => db.collection('sales'));
  const sale = await Sales.findOne({ _id: ObjectId(id) });
  await Sales.deleteOne({ _id: ObjectId(id) });

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
