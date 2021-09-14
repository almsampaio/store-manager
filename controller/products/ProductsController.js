const productsService = require('../../service/ProductsService');

const PROD_ERR_STATUS_MESSAGE = require('../../util/ProdStatusMessages');

const createProductController = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await productsService.createProductService(name, quantity);
    
    switch (product) {
        case 'ERR_PROD_NAME_LENGTH': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.NAME_LENGTH);
        case 'ERR_PROD_QTY_BELOW_ZERO': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.QTY_BELOW_ZERO);
        case 'ERR_PROD_ALREADY_EXISTS': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.ALREADY_EXISTS);
        case 'ERR_QTY_NOT_NUMBER': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.QTY_NOT_NUMBER);
        default: 
            return res.status(201).json(product);
    }    
};

const getAllProductsController = async (_req, res) => {
    const allProducts = await productsService.getAllProductsService();
    
    return res.status(200).json(allProducts);
};

const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    const productById = await productsService.getProductByIdService(id);

    if (productById === 'ID_NOT_EXISTS') {
        return res.status(422).json(PROD_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
    }

    return res.status(200).json(productById);
};

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await productsService.updateProductService(id, name, quantity);

    switch (updatedProduct) {
        case 'ID_NOT_EXISTS': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
        case 'ERR_PROD_NAME_LENGTH': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.NAME_LENGTH);
        case 'ERR_PROD_QTY_BELOW_ZERO': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.QTY_BELOW_ZERO);
        case 'ERR_QTY_NOT_NUMBER': 
            return res.status(422).json(PROD_ERR_STATUS_MESSAGE.QTY_NOT_NUMBER);
        default: 
            return res.status(200).json({ id, name, quantity });
    }
};

const deleteProductController = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteProductService(id);
    
    if (deletedProduct === 'ID_NOT_EXISTS') {
        return res.status(422).json(PROD_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
    }

    return res.status(200).json(deletedProduct);
};

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
};