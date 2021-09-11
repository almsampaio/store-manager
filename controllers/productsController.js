const { TWO_HUND,
    TWO_HUND_ONE,
    FOUR_HUND_TWO,
    FOUR_HUND_FOUR,
    FOUR_HUND_ONE } = require('./consts');

const productsModel = require('../models/productsModel');
const productsService = require('../services/productsService');

const create = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productsService.create(name, quantity);
    if (product.message) return res.status(FOUR_HUND_ONE).json({ message: product.message });
    res.status(TWO_HUND_ONE).json(product);
};

const getAll = async (_req, res) => {
    const products = await productsModel.getAll();
    res.status(TWO_HUND).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productsModel.getById(id);
    if (!product) return res.status(FOUR_HUND_FOUR).json({ message: "not found" });
    res.status(TWO_HUND).json(product);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const product = await productsModel.getById(id);
    if (!product) return res.status(FOUR_HUND_FOUR).json({ message: "not found" });
    res.status(FOUR_HUND_TWO).end();
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
