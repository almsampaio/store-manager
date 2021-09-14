const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = (rescue(async (req, res) => {
    const itensSold = req.body;

    const sale = await salesService.create(itensSold);
    
    if (sale.err) return res.status(422).json(sale);

    res.status(200).json(sale);
}));

const getAll = (rescue(async (_req, res) => {
    const sale = await salesService.getAll();

    res.status(200).json(sale);
}));

const getById = (rescue(async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (sale.err) return res.status(404).json(sale);

    res.status(200).json(sale);
}));

const update = (rescue(async (req, res) => {
    const { id } = req.params;
    const itensSold = req.body;

    const sale = await salesService.update(id, itensSold);

    if (sale.err) return res.status(422).json(sale);

    res.status(200).json(sale);
}));

module.exports = {
    create,
    getAll,
    getById,
    update,
};