const Sales = require('../services/Sales');

const getAllSales = async (_req, res) => {
    const { status, data } = await Sales.getAllSales();
    res.status(status).json({ sales: data });
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { status, data, message } = await Sales.getById(id);

    if (message) return res.status(status).json({ err: { code: 'not_found', message } });
    res.status(status).json(data);
  };

const createSales = async (req, res) => {
    const newSales = req.body;
    const { status, data } = await Sales.createSales(newSales);
    res.status(status).json(data);
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await Sales.updateSales(id, req.body);
    res.status(status).json(data);
};  

const deleteSales = async (req, res) => {
    const { id } = req.params;
    const { status, data, message } = await Sales.deleteSales(id);
    if (message) {
 return res.status(status).json({ err: { code: 'invalid_data', message } }); 
}res.status(status).json(data); 
};

module.exports = { getAllSales, getById, createSales, updateSales, deleteSales };
