const status = require('http-status');
const productModel = require('../models/productModel');
const productService = require('../services/productService');
const generalError = require('../middlewares/error');

const getAllProducts = async (_req, res) => {
    const products = await productModel.getAll();
    return res.status(status.OK).json({ products });
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getId(id);
        return res.status(status.OK).json(product);
    } catch (error) {
        const msg = 'Wrong id format';
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(msg));
    }
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const responseMSG = await productService.addValidation(name, quantity);

    if (typeof (responseMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(responseMSG));
    } 
        return res.status(status.CREATED).json(responseMSG);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const responseMSG = await productService.updateValidation(id, name, quantity);

    if (typeof (responseMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(generalError.error(responseMSG));
    } 
        return res.status(status.OK).json(responseMSG);
};

module.exports = { getAllProducts, createProduct, getProductById, updateProduct }; 