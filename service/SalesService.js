const { ObjectId } = require('mongodb');
const salesModel = require('../model/SalesModel');
const { getProductByIdService } = require('./ProductsService');

const createSaleService = async (productId, quantity) => {
    const res = await getProductByIdService(productId);
    
    if (res === 'ID_NOT_EXISTS') return res;
    if (quantity <= 0) return 'ERR_SALE_QTY_BELOW_ZERO';    
    if (typeof (quantity) !== 'number') return 'ERR_QTY_NOT_NUMBER';
    
    const result = await salesModel.createSalesModel(productId, quantity);
    return result;
}; 

const getAllSalesService = async () => {
    const allsales = await salesModel.getAllSalesModel();
    return allsales;
};

const getSaleByIdService = async (id) => {
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';

    const sale = await salesModel.getSaleByIdModel(id);
    return sale;
};

const deleteSaleService = async (id) => {
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    const deletedsale = await salesModel.deleteSaleModel(id);
    return deletedsale;
};

module.exports = {
    createSaleService,
    getAllSalesService,
    getSaleByIdService,
    deleteSaleService,
};