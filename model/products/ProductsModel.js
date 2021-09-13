const connection = require('../connection');

const createProductsModel = async (name, quantity) => {
    const productData = connection()
        .then((db) => db.collection('products').insertOne({ name, quantity }))
        .then((result) => result.ops[0]);

    return productData;
};

const findProductName = async (name) => {
    const db = await connection();
    const productName = await db.collection('products').findOne({ name });
    return productName;
};

const getAllProductsModel = async () => {
    const db = await connection();
    const allProducts = await db.collection('products').find({}).toArray();
    return allProducts;
};

module.exports = { 
    createProductsModel, 
    findProductName,
    getAllProductsModel,
};