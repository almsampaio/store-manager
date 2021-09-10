const insertOne = require('../models/insertOne');

const insertAndReturnOne = async (product) => {
    const { ops } = await insertOne(product, 'products');
    const [newProduct] = ops;
    return newProduct;
};

module.exports = insertAndReturnOne;