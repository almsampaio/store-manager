// Solução enconntrado em parceria com Eduardo Costa - Turma 10-A
const { ObjectId } = require('mongodb');
const connectionDb = require('./connection');

const getAll = async () => {
  const allSales = await connectionDb()
    .then((db) => db.collection('sales').find({}).toArray());
  return allSales;
};

const inputSales = async (salesArray) => {
  const { ops: newSale } = await connectionDb()
    .then((db) => db.collection('sales')
      .insertOne(
        {
          itensSold: salesArray,
        },
      ));
  return newSale[0];
};

const searchSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connectionDb();
  await sale.collection('sales')
    .findOne(ObjectId(id));
  if (!sale) return null;
  return sale;
};

const updateSale = async (id, itensSold) => {
  const updateSaleId = await connectionDb();
  await updateSaleId.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    );
  return { _id: id, itensSold };
};

module.exports = {
  getAll,
  inputSales,
  searchSale,
  updateSale,
};
