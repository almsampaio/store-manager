const productService = require('../services/products');

const addProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const { status, data, message } = await productService.addProduct(name, quantity);
    if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
    res.status(status).json(data);
};

const getAll = async (_req, res) => {
    const { status, data } = await productService.getAll();
    res.status(status).json({ products: data });
};
const getById = async (req, res) => {
    const { id } = req.params;
    const { status, data, message } = await productService.getById(id);
    if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
    res.status(status).json(data);
};

const update = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productService.update(id, req.body);
    res.status(status).json(data);
};

module.exports = { addProduct, getAll, getById, update };
