const salesService = require('../service/SalesService');

const SALE_ERR_STATUS_MESSAGE = require('../util/ProdStatusMessages');

const createSaleController = async (req, res) => {
    const [item] = req.body;
    const { productId, quantity } = item;

    const sale = await salesService.createSaleService(productId, quantity);
    
    switch (sale) {
        case 'ID_NOT_EXISTS': 
        return res.status(422).json(SALE_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
        case 'ERR_SALE_QTY_BELOW_ZERO': 
            return res.status(422).json(SALE_ERR_STATUS_MESSAGE.QTY_BELOW_ZERO);
        case 'ERR_QTY_NOT_NUMBER': 
            return res.status(422).json(SALE_ERR_STATUS_MESSAGE.QTY_NOT_NUMBER);
        case 'ERR_QTY_NOT_STRING': 
            return res.status(422).json(SALE_ERR_STATUS_MESSAGE.QTY_NOT_STRING);
        default: 
            return res.status(201).json(sale);
    }    
};

const getAllSalesController = async (_req, res) => {
    const allsales = await salesService.getAllSalesService();
    
    return res.status(200).json(allsales);
 };

const getSaleByIdController = async (req, res) => {
    const { id } = req.params;
    const saleById = await salesService.getSaleByIdService(id);
     if (saleById === 'ID_NOT_EXISTS') {
        return res.status(422).json(SALE_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
    }
     return res.status(200).json(saleById);
};

const deleteSaleController = async (req, res) => {
    const { id } = req.params;
    const deletedSale = await salesService.deleteSaleService(id);
 
    if (deletedSale === 'ID_NOT_EXISTS') {
        return res.status(422).json(SALE_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
    }
     return res.status(200).json(deletedSale);
};

module.exports = {
    createSaleController,
    getAllSalesController,
    getSaleByIdController,
    deleteSaleController,
    // updateSaleController,
};