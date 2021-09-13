// const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collectionName = 'products';

const register = async (sales) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName).insertOne({ itensSold: sales });
    return { _id: result.insertedId };
  };

module.exports = {
  register,
  
  }; 