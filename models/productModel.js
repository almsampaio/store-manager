const getConnection = require('./connection');

const collectionName = 'products';

const findByName = async (name) => {
    const db = await getConnection(); 
    const song = await db.collection(collectionName).findOne({ name });

    return song;
};

const register = async (name, quantity) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName).insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
  };

module.exports = {
    findByName,
    register,
  
  }; 