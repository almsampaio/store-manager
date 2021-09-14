const sumProducts = require('./sumProducts');
const subtractProducts = require('./subtractProduct');
const {
    findById,
} = require('../models');

const updateSumAndSubtract = async (id, saleArr) => {
    const { itensSold } = await findById(id, 'sales');
    await itensSold.forEach(async (product) => sumProducts(product));
    await saleArr.forEach(async (product) => subtractProducts(product).catch(() => {
        throw new Error('erro em sum and subtract');
         }));
};

module.exports = updateSumAndSubtract;