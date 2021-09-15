const salesModels = require('../models/salesModels');
const modelsProducts = require('../models/productsModel');
const servicesProducts = require('../services/productsServices');

const getAll = async (_req, res) => {
    const sales = await salesModels.getAll();
    res.status(200).json({ sales });
};

const createNewSales = async (req, res) => {
    const sales = await salesModels.createNewSales(...req.body);
    res.status(200).json(sales);
    servicesProducts
    .updateQuantityProducyBySale(req.body, modelsProducts.updateProductByQuantityAddSale);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesModels.getSaleById(id);
    if (!sale) {
     return res.status(404)
    .json({ err: { code: 'not_found', message: 'Sale not found' } });
}
    res.status(200).json(sale);
};

const updateSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesModels.updateSaleById(id, ...req.body);
    if (!sale) {
     return res.status(422)
    .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }); 
}

    res.status(200).json(sale);
};

const deleteSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesModels.getSaleById(id);
    if (!sale) {
     return res.status(422)
    .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
}
   res.status(200).json(sale);
   await salesModels.deleteSaleByID(id);
   servicesProducts
   .updateQuantityProducyBySale(sale.itensSold, modelsProducts.updateProductByQuantityRemoveSale);
};

module.exports = {
   getAll,
   createNewSales,
   getSaleById,
   updateSaleById,
   deleteSaleById,
};