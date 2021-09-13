const createProductService = require('../../service/ProductsService');

const PROD_ERR_STATUS_MESSAGE = require('../../util/ProdStatusMessages');

const createProductController = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await createProductService(name, quantity);
    
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

module.exports = createProductController;