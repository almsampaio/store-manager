const { ObjectId } = require('mongodb');
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
    const allProducts = await ProductsModel.getAllProductsModel();
    return allProducts;
};

const getProductByIdService = async (id) => {
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    const productById = await ProductsModel.getProductByIdModel(id);
    return productById;
};

const updateProductService = async (id, name, quantity) => {
    if (name.length < 5) return 'ERR_PROD_NAME_LENGTH';        
    if (quantity <= 0) return 'ERR_PROD_QTY_BELOW_ZERO';
    if (typeof (quantity) !== 'number') return 'ERR_QTY_NOT_NUMBER';
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    
    const updatedProduct = await ProductsModel.updateProductModel(id, name, quantity);
    return updatedProduct;
};

const deleteProductService = async (id) => {
    if (!ObjectId.isValid(id)) return 'ID_NOT_EXISTS';
    const deletedProduct = await ProductsModel.deleteProductModel(id);
    return deletedProduct;
};

module.exports = {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
};