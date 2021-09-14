const sumProducts = require('./sumProducts');
const { findById } = require('../models');

const updateToSum = async (id) => {
    const { itensSold } = await findById(id, 'sales');
    await itensSold.forEach(async (product) => {
        await sumProducts(product);
    });
};

module.exports = updateToSum;