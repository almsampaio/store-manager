const salesModel = require('../models/salesModel');
const salesSchema = require('../schemas/salesSchema');

const create = async (itensSold) => {
    const quantityVerified = salesSchema.validateQuantity(itensSold);
    
   const stockSale = await salesSchema.validateStockQuantity(itensSold);

    if (stockSale) { return stockSale; }

    await salesSchema.sumProductQuantity(itensSold);

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

const update = async (id, itensSold) => {
    const quantitySale = await salesSchema.validateQuantity(itensSold);

    if (quantitySale) { return quantitySale; }

    const updateSale = await salesModel.update(id, itensSold);

    return updateSale;
};

const remove = async (id) => {
    const saleId = await salesSchema.validateSaleIdRemove(id);
    
    if (saleId) { return saleId; }
    
    await salesSchema.subProductQuantity(id);
    
    const removedSale = await salesModel.remove(id);

    return removedSale;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};