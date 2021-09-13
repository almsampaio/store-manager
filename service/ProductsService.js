const ProductsModel = require('../model/products/ProductsModel');

const createProductService = async (name, quantity) => {
    const prodAlreadyExists = await ProductsModel.findProductName(name);

    if (name.length < 5) return 'ERR_PROD_NAME_LENGTH';        
    if (quantity <= 0) return 'ERR_PROD_QTY_BELOW_ZERO';    
    if (prodAlreadyExists) return 'ERR_PROD_ALREADY_EXISTS';
    if (typeof (quantity) !== 'number') return 'ERR_QTY_NOT_NUMBER';
        
    const result = await ProductsModel.createProductsModel(name, quantity);

    return result;
}; 

const getAllProductsService = async () => {
    // proxy

    const products = await ProductsModel.getAllProductsModel();
    return products;
};

module.exports = {
    createProductService,
    getAllProductsService,
};