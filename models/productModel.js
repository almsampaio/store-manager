const getConnection = require('./connection');

const DB_NAME = 'StoreManager';

const findByName = async (name) => {
    const db = await getConnection(); 
    const song = await db.collection(DB_NAME).findOne({ name });

    return song;
};

const register = async (name, quantity) => {
    const db = await getConnection(); 
    const result = await db.collection(DB_NAME).insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
  };

module.exports = {
    findByName,
    register,
  
  }; 