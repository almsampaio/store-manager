const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (itensSold) => {
    const db = await connection();
    const result = await db.collection('sales').insertOne({ itensSold });
    return { _id: result.insertedId, itensSold };
};

const getSales = async () => {
  const db = await connection();
  const get = db.collection('sales').find().toArray();
  return get;
};

const getIdSales = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findByIdSales = db.collection('sales').findOne(ObjectId(_id));
  return findByIdSales;
};

const editSale = async (_id, itensSold) => {
  // if (!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const edit = db.collection('sales').updateOne(
    {
      _id: ObjectId(_id) }, 
    { $set: { itensSold } },
  );
  console.log(edit);
  return { _id, itensSold };
};

const deleteSale = async (_id) => {
  const db = await connection();
  const deletee = db.collection('sales').deleteOne(
    {
      _id: ObjectId(_id),
    },
  );
  return deletee;
};

module.exports = { createSale, getSales, getIdSales, editSale, deleteSale };
