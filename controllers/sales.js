const sales = require('../services/sales');

const addSales = async (req, res) => {
    const { status, data, message, err } = await sales.addSales(req.body);
    if (message) return res.status(status).json({ err: { code: 'not_found', message } });
    if (err) return res.status(status).json({ err: { code: 'stock_problem', message: err } });

    res.status(status).json(data);
};

const getAllSales = async (_req, res) => {
    const { status, data } = await sales.getAllSales();
    res.status(status).json({ sales: data });
};

const getSalesById = async (req, res) => {
    const { id } = req.params;
    const { status, data, message } = await sales.getSalesById(id);

    if (message) return res.status(status).json({ err: { code: 'not_found', message } });
    res.status(status).json(data);
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await sales.updateSales(id, req.body);
    res.status(status).json(data);
};

module.exports = { addSales, getAllSales, getSalesById, updateSales };
