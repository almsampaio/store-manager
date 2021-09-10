const connection = require('./connection');

const insertOne = async (obj, collectionsName) => {
    const db = await connection();
    return db.collection(collectionsName).insertOne(obj);    
};

module.exports = insertOne;