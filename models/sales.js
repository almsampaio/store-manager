const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createSales = async (itensSold) => 
   getConnection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));
   
    const getAllSales = async () => {
    const db = await getConnection(); 
    const saleslist = await db.collection('sales').find({}).toArray();
    const salesAll = { sales: saleslist };
    return salesAll;
  }; 
  const getById = async (id) => {
    const idSize = 24;
    if (id.length < idSize) return null;
    const db = await getConnection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
  };
  const updateSales = async (id, arraySales) => {
    const idSize = 24;
    if (id.length < idSize) return null;
    const itensSold = arraySales;
    const db = await getConnection();
    const salesUpdate = await db.collection('sales').findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: 
        { itensSold },
      },
      { returnDocument: 'after' },
    );
    return salesUpdate.value;
  };
  const deleteSale = async (id) => {
    const idSize = 24;
    if (id.length < idSize) return null;
    const db = await getConnection();
    const sale = await db.collection('sales').findOneAndDelete(
      { _id: ObjectId(id) }, 
      { returnDocument: 'before' },
    );
    return sale.value;
  };
  
module.exports = {
    createSales,
    getAllSales,
    getById,
    updateSales,
    deleteSale,
};