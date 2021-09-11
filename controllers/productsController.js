const { TWO_HUND,
    TWO_HUND_ONE,
    FOUR_HUND_TWO,
    FOUR_HUND_FOUR,
    FOUR_HUND_ONE } = require('./consts');

const productsModel = require('../models/productsModel');
const productsService = require('../services/productsService');

const create = async (req, res) => {

    const { name, quantity } = req.body;

    const { err, product } = await productsService.create(name, quantity);

    if (err) return res.status(FOUR_HUND_ONE).json({ err });

    res.status(TWO_HUND_ONE).json(product);
};

const getAll = async (_req, res) => {
    const products = await productsService.getAll();

    res.status(TWO_HUND).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const { product, err } = await productsService.getById(id);

    if (err) return res.status(FOUR_HUND_FOUR).json({ err });

    res.status(TWO_HUND).json(product);
};

const remove = async (req, res) => {
    const { id } = req.params;

    const { product, err } = await productsService.getById(id);

    if (err) return res.status(FOUR_HUND_FOUR).json({ err });

    res.status(FOUR_HUND_TWO).json(product);
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
