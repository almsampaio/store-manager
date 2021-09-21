const { ObjectId } = require('bson');
const connection = require('./connection');

const createNewSales = async (data) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: data }))
  .then((sale) => ({ _id: sale.insertedId, itensSold: data }))
  .catch((e) => e.message);

const getAllSales = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const findById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const updateSales = async (id, data) => {
  if (!ObjectId.isValid(id)) return null;
  console.log('Aquiiii', data);
  const db = await connection();
  const update = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: data } },
      { returnOriginal: false },
    );
  if (!update) return null;
  return update;
};

const deleteSale = async (id) => {
  try {
    const sale = await findById(id);
    if (!sale) return sale;
    const db = await connection();
    await db.collection('sales').deleteOne({ _id: ObjectId(id) });
    return sale;
  } catch (e) {
    return console.log(e.message);
  }
};

module.exports = {
  createNewSales,
  getAllSales,
  findById,
  updateSales,
  deleteSale,
};
