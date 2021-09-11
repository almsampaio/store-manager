const { TWO_HUND,
    TWO_HUND_ONE,
    FOUR_HUND_TWO,
    FOUR_HUND_FOUR } = require('./consts');
const productsModel = require('../models/productsModel');

const create = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productsModel.create(name, quantity);
    res.status(TWO_HUND_ONE).json(product);
};

const getAll = async (_req, res) => {
    const products = await productsModel.getAll();
    res.status(TWO_HUND).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productsModel.getById(id);
    res.status(TWO_HUND).json(product);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const product = await productsModel.getById(id);
    if (!product) res.status(FOUR_HUND_FOUR).json({ message: "not found" });
    res.status(FOUR_HUND_TWO).end();
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
