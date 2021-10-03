const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (items) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: items });

  return newSale.ops[0];
};

const readAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const readById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

const update = async (id, item) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updateSale = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: item } }, 
      { returnOriginal: false },
    );

  if (!updateSale) return null;

  return updateSale.value;
};

const destroy = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleDeleted = await readById(id);
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return saleDeleted;
};

module.exports = {
  create,
  readAll,
  readById,
  update,
  destroy,
}; 