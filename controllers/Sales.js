const Sales = require('../service/Sales');

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

module.exports = { getAllSales, getById, createSales };
