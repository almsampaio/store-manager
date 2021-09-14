const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = (rescue(async (req, res) => {
    const itensSold = req.body;

    const sale = await salesService.create(itensSold);
    
    if (sale.err) return res.status(422).json(sale);

    res.status(200).json(sale);
}));

module.exports = {
    create,
};