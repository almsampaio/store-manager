const connection = require('./connection');

const insertOne = async (obj) => {
    const db = await connection();
    return db.collection('products').insertOne(obj);    
};

module.exports = insertOne;