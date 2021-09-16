const { ObjectId } = require('mongodb');
const salesModel = require('../model/SalesModel');
const { getProductByIdService } = require('./ProductsService');

// id valido porem inexistente: 6142456ec299286e92234b9f

const checkProductInDatabase = (item) => {
    const arrPromises = [];
    for (let index = 0; index < item.length; index += 1) {
         if (item[index].quantity <= 0 || typeof (item[index].quantity) !== 'number') {
            return 'ERR_QTY';
        }
        const product = getProductByIdService(item[index].productId);
        arrPromises.push(product);
    }
    return arrPromises;
};

const createSaleService = async (item) => {
    const productOrErrorMessage = checkProductInDatabase(item);

    if (productOrErrorMessage === 'ERR_QTY') return productOrErrorMessage;

    const res = await Promise.all(productOrErrorMessage);
    const isValid = res.every((prod) => {
        if (prod === 'ERR_QTY' || prod === 'ID_NOT_EXISTS') return false;
        return true;
    });
    
    if (isValid) {
        const a = res
          .map(({ _id }, index) => (
            { productId: _id, quantity: item[index].quantity }
            ));
        const result = await salesModel.createSalesModel(a);
        return result;
    } return 'ID_NOT_EXISTS';
};

const getAllSalesService = async () => {
    const allsales = await salesModel.getAllSalesModel();
    return allsales;
};

const getSaleByIdService = async (id) => {
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    const sale = await salesModel.getSaleByIdModel(id);
    if (sale === null) return 'ID_NOT_EXISTS';
    return sale;
};

const deleteSaleService = async (id) => {
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    const deletedsale = await salesModel.deleteSaleModel(id);
    return deletedsale;
};

const updateSaleService = async (id, productId, quantity) => {
    if (quantity <= 0 || typeof (quantity) !== 'number') return 'ERR_QTY';

    const updatedSale = await salesModel.updateSaleModel(id, productId, quantity);
    return updatedSale;
};

module.exports = {
    createSaleService,
    getAllSalesService,
    getSaleByIdService,
    deleteSaleService,
    updateSaleService,
};