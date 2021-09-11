const { TWO_HUND,
    TWO_HUND_ONE,
    FOUR_HUND_TWO,
    FOUR_HUND_FOUR } = require('./consts');
const salesModel = require('../models/salesModel');

const create = async (req, res) => {
    const { itensSold, quantity } = req.body;
    const sale = await salesModel.create(itensSold, quantity);
    res.status(TWO_HUND_ONE).json(sale);
};

const getAll = async (req, res) => {
    const sales = await salesModel.getAll();
    res.status(TWO_HUND).json(sales);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesModel.getById(id);
    if (!sale) return res.status(FOUR_HUND_FOUR).json({ message: "not found"});
    res.status(TWO_HUND).json(sale);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const sale = await salesModel.getById(id);
    if (!sale) return res.status(FOUR_HUND_FOUR).json({ message: "not found"});
    res.status(FOUR_HUND_TWO).end();
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
