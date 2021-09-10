const { insertOne } = require('../models');

const insertAndReturnSale = async (products) => {
    const itensSold = [...products];
    const { ops } = await insertOne({ itensSold }, 'sales');
    const [newSale] = ops;
    return newSale;
};

module.exports = insertAndReturnSale;