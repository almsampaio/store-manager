const salesModel = require('../models/salesModel');
const salesSchema = require('../schemas/salesSchema');

const create = async (itensSold) => {
    const quantityVerified = salesSchema.validateQuantity(itensSold);

    if (quantityVerified) { return quantityVerified; }

    const createdSales = await salesModel.create(itensSold);
    
    return createdSales;
};

const getAll = async () => {
    const sales = await salesModel.getAll();
    return { sales };
};

const getById = async (id) => {
    const saleId = salesSchema.validateSaleDoesntExistId(id);

    if (saleId) { return saleId; }

    const listedSale = await salesModel.getById(id);

    return listedSale;
};

module.exports = {
    create,
    getAll,
    getById,
};