const { ObjectId } = require('mongodb');
const connection = require('./conection');

const createSale = (params) => (
  connection()
    .then((db) => (db.collection('sales').insertOne(params)))
    .then((result) => ({ _id: result.insertedId, ...params }))
);

const getAll = async () => (
  connection()
  .then((db) => db.collection('sales').find().toArray())
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  return saleData;
};

const update = async (id, sales) => {
  const updateSale = await connection()
    .then((db) => db.collection('sales')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      [{ $set: { itensSold: sales } }],
      { returnOriginal: false },
    ));

  return updateSale.value;
};

const deleteOne = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const deletedSale = await connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: new ObjectId(id) }));

  return deletedSale.value;
};

module.exports = {
  createSale,
  getAll,
  findById,
  update,
  deleteOne,
};
