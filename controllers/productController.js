const status = require('http-status');
const productModel = require('../models/productModel');
const productService = require('../services/productService');
const errorGeneral = require('../middlewares/error');

const getAllProducts = async (_req, res) => {
    const products = await productModel.getAll();
    return res.status(status.OK).json(products);
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const createMSG = await productService.addValidation(name, quantity);

    if (typeof (createMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).send(errorGeneral.error(createMSG));
    } 
        return res.status(status.CREATED).send(createMSG);
};

module.exports = { getAllProducts, createProduct }; 