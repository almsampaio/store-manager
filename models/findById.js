const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (producId) => {
    const db = await connection();
    const teste = await db.collection('products').findOne(new ObjectId(producId));       
    return teste;
};

module.exports = findById;