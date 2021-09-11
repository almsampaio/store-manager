const { ObjectId } = require('mongodb');
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

const getAllProducts = async () => {
    const db = await connection.mongoDB();
    const products = await db.collection('products').find().toArray();
    return products;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection.mongoDB();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
};

module.exports = { createNewProduct, searchProductByName, getAllProducts, getById };