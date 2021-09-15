const salesService = require('../service/SalesService');

const SALE_ERR_STATUS_MESSAGE = require('../util/SalesStatusMessage');

const createSaleController = async (req, res) => {
    const item = req.body;

    const sale = await salesService.createSaleService(item);
    console.log('sale', sale);
    
    switch (sale) {
        case 'ID_NOT_EXISTS': 
            return res.status(422).json(SALE_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
        case 'ERR_QTY': 
            return res.status(422).json(SALE_ERR_STATUS_MESSAGE.ERR_QTY);
        default: 
            return res.status(200).json(sale);
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
        return res.status(404).json(SALE_ERR_STATUS_MESSAGE.ID_NOT_EXISTS);
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

const updateSaleController = async (req, res) => {
    const { id } = req.params;
    const [arrFromBody] = req.body;
    const { productId, quantity } = arrFromBody;

    const updatedSale = await salesService.updateSaleService(id, productId, quantity);

    if (updatedSale === 'ERR_QTY') {
        return res.status(422).json(SALE_ERR_STATUS_MESSAGE.ERR_QTY);
    }

    return res.status(200).json(updatedSale);
};

module.exports = {
    createSaleController,
    getAllSalesController,
    getSaleByIdController,
    deleteSaleController,
    updateSaleController,
};