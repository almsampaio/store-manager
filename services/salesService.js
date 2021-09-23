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
  
    return { status: 200, data: sales };
};

const getById = async (id) => {
    const sale = await salesModel.getById(id);
    return sale;
};

const update = async (id, itensSold) => {
    const err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    for (let i = 0; i < itensSold.length; i += 1) {
        if (itensSold[i].quantity < 1 || typeof itensSold[i].quantity === 'string') {
            return err;
        }
    }
  
    const updatedSale = await salesModel.update(id, itensSold);

    return updatedSale;
};

const remove = async (id) => { 
    await salesModel.remove(id);
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update,
};
