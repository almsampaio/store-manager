const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const SALES_COLLECTION = 'sales';

const isValidID = (id) => ObjectId.isValid(id);

const create = async (sale) => {
  const document = {
    itensSold: sale,
  };
  const db = await getConnection();
  const result = await db.collection(SALES_COLLECTION).insertOne(document);
  const [savedSale] = result.ops;
  return savedSale;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getByID = async (id) => {
  if (!isValidID(id)) return null;

  const connection = await getConnection();

  const sale = await connection.collection(SALES_COLLECTION)
    .findOne({ _id: ObjectId(id) });
  return sale;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => {
  const connection = await getConnection();

  const sales = await connection.collection(SALES_COLLECTION).find({}).toArray();

  return { sales };
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (id, sale) => {
  if (!isValidID(id)) return null;

  const filter = { _id: ObjectId(id) };

  const document = { $set: { itensSold: sale } };

  const options = { returnDocument: 'after' };

  const db = await getConnection();

  const result = await db.collection(SALES_COLLECTION)
    .findOneAndUpdate(filter, document, options);

  return result.value;
};

const exclude = async (id) => {
  if (!isValidID(id)) return null;

  const filter = { _id: ObjectId(id) };

  const db = await getConnection();

  const result = await db.collection(SALES_COLLECTION).findOneAndDelete(filter);

  return result.ok ? result.value : null;
};

module.exports = { create, getByID, getAll, update, exclude };
