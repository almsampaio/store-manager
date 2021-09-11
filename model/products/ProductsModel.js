const connection = require('../connection');

const createProductsModel = async (name, quantity) => {
    // usando .then só para treino
    const productData = connection()
        .then((db) => db.collection('products').insertOne({ name, quantity }))
        .then((result) => result.ops);

    return productData;
};

const findProductName = async (name) => {
    const db = await connection();
    const productName = await db.collection('products').findOne({ name });
    
    return productName;
};

module.exports = { 
    createProductsModel, 
    findProductName,
};