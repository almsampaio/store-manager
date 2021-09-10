const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (id, collectionName) => {
    const db = await connection();
    const product = await db.collection(collectionName).findOne(new ObjectId(id));       
    return product;
};

module.exports = findById;