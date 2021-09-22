const salesModel = require('../models/salesModel');

const create = async (sale) => {
for (let i = 0; i < sale.length; i += 1) {
    if (sale[i].quantity < 1) {
        return { err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
    } };
} if (typeof sale[i].quantity === 'string') {
    return { err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
    } };
}
}
    const createdSale = await salesModel.create(sale);

    return { createdSale };
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
