const salesModel = require('../models/salesModel');
// const productsModel = require('./productsModel');
const create = async (itensSold) => {
    const [...{ productId, quantity }] = itensSold;

    const isValid = await salesModel.findProductId(productId);

    const errorObject = { err: {
        code: 'invalid_data',
        message: 'Wrong product id or invalid quantity' },
    };

    if (!isValid) return errorObject;

    if (quantity < 1) return errorObject;

    if (typeof quantity === 'string') return errorObject;

    return salesModel.create(itensSold);
};

const getAll = async () => {
    const sales = await salesModel.getAll();
    return sales;
};

const getById = async (id) => {
    const sale = await salesModel.getById(id);
    return sale;
};

const remove = async (id) => { 
    await salesModel.remove(id);
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
