const salesModel = require('../models/salesModel');
const { saleValidate } = require('../schemas/salesSchema');

const create = async (sale) => {
    const validations = saleValidate(sale);

    if (validations.err) return validations;

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

const update = async (id, sale) => {
    const validations = saleValidate(sale);

    if (validations.err) return validations;

    const updatedSale = await salesModel.update(id, sale);

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
