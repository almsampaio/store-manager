const connection = require('./connection');

const createNewProduct = async (name, quantity) => {
    const db = await connection.mongoDB();
    const { insertedId } = await db.collection('products').insertOne({ name, quantity });
     return { _id: insertedId, name, quantity };
};

const searchProductByName = async (name) => {
    const db = await connection.mongoDB();
    const searchProduct = await db.collection('products').find({ name }).toArray();
    return searchProduct;
};

module.exports = { createNewProduct, searchProductByName };