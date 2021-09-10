const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (producId) => {
    const db = await connection();
    const product = await db.collection('products').findOne(new ObjectId(producId));       
    return product;
};

module.exports = findById;