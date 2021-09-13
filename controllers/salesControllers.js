const salesModels = require('../models/salesModels');

const getAll = async (req, res) => {
    const sales = await salesModels.getAll();
    res.status(200).json(sales);
};

const createNewSales = async (req, res) => {
    const sales = await salesModels.createNewSales(...req.body);
    res.status(200).json(sales);
};

module.exports = {
   getAll,
   createNewSales,
};