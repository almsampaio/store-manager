const insertOne = require('../models/insertOne');

const insertAndReturnOne = async (product) => {
    const { ops } = await insertOne(product);
    const [newProduct] = ops;
    return newProduct;
};

module.exports = insertAndReturnOne;