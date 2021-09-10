const connection = require('./connection');

const findAll = async (collectionName) => {
    const db = await connection();
    const allProducts = await db.collection(collectionName).find().toArray();
    return allProducts;
};

module.exports = findAll;