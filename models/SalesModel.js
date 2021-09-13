const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'sales';

const create = async (productsList) => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const newSale = await SalesCollection
    .insertMany([{ itensSold: [...productsList] }]); // Interação com o DB

  return newSale.ops[0];
};

const getAll = async () => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const salesList = await SalesCollection
    .find().toArray(); // Interação com o DB

  return salesList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundSale = await SalesCollection
    .findOne({ _id: ObjectId(id) }); // Interação com o DB

  return foundSale;
};

const update = async (saleId, productsList) => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const updatedSale = await SalesCollection
    .findOneAndUpdate(
      { _id: ObjectId(saleId) },
      { $set: { itensSold: productsList } },
      { returnOriginal: false }, // Caso true ele exibe o objeto antes de ser alterado, falhando o teste. Fonte: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
    );

  console.log(updatedSale.value);

  return updatedSale.value;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
