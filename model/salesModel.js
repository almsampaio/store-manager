const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const addNewSale = async (newSale) => {
    try {
        const result = await connection().then((db) => db.collection(collection)
          .insertMany(newSale)).catch((err) => err);
        return result.ops;
      } catch (error) {
        return error.message;
      }
};

const getAllSales = async () => {
    try {
      const sales = await connection().then((db) => db.collection(collection).find().toArray());
      return sales;
    } catch (error) {
      return error.message;
    }
};

const getSalesById = async (id) => {
    try {
      const sale = await connection().then((db) => db.collection(collection)
      .find({ _id: ObjectId(id) }));
      return sale;
    } catch (error) {
      return error.message;
    }
};

module.exports = {
    addNewSale,
    getAllSales,
    getSalesById,
};