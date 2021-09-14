const { ObjectId } = require('mongodb');
const salesModel = require('../model/SalesModel');
const { getProductByIdService } = require('./ProductsService');

const createSaleService = async (productId, quantity) => {
    console.log('productId', productId)
    const checkProductId = await getProductByIdService(productId);
    
    if (checkProductId === 'ID_NOT_EXISTS') return checkProductId;
    if (quantity <= 0) return 'ERR_SALE_QTY_BELOW_ZERO';    
    if (typeof (quantity) !== 'number') return 'ERR_QTY_NOT_NUMBER';
    
    console.log('🇦🇫', checkProductId);
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

// const updatesaleService = async (id, name, quantity) => {
//     if (name.length < 5) return 'ERR_SALE_NAME_LENGTH';        
//     if (quantity <= 0) return 'ERR_SALE_QTY_BELOW_ZERO';
//     if (typeof (quantity) !== 'number') return 'ERR_QTY_NOT_NUMBER';
//     if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    
//     const updatedsale = await salesModel.updatesaleModel(id, name, quantity);
//     return updatedsale;
// };

module.exports = {
    createSaleService,
    getAllSalesService,
    getSaleByIdService,
    deleteSaleService,
    // updatesaleService,
};