const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
    const [...{ productId, quantity }] = itensSold;

    const isValid = await salesModel.findProductId(productId);

    const errorObject = { err: {
        'code': 'invalid_data',
        'message': 'Wrong product id or invalid quantity' }
    };

    if (!isValid) return errorObject;

    if (quantity < 1) return errorObject;

    if (typeOf (quantity) === 'string') return errorObject;

    return await salesModel.create(itensSold);
};

const getAll = async () => {
    const sales = await salesModel.getAll();

    return sales;
};

const getById = async (id) => {
    const sale = await salesModel.getById(id);


};

const remove = async (id) => {
    const sale = await salesModel.remove(id);

};

module.exports = {
    create,
    getAll,
    getById,
    remove,
}
