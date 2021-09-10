const connection = require('./connection');

const findAll = async () => {
    const db = await connection();
    const allProducts = await db.collection('products').find().toArray();
    return allProducts;
};

module.exports = findAll;