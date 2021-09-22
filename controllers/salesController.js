const { TWO_HUND,
    FOUR_HUND_TWO,
    FOUR_HUND_FOUR, 
    FOUR_TWO_TWO } = require('./consts');
const salesService = require('../services/salesService');

const create = async (req, res) => {
    const sale = req.body;

    const { err, createdSale } = await salesService.create(sale);

    if (err) return res.status(FOUR_TWO_TWO).json({ err });
    res.status(TWO_HUND).json(createdSale);
};

const getAll = async (_req, res) => {
    const sales = await salesService.getAll();

    res.status(TWO_HUND).json(sales);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (!sale) return res.status(FOUR_HUND_FOUR).json({ message: 'not found' });

    res.status(TWO_HUND).json(sale);
};

const remove = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (!sale) return res.status(FOUR_HUND_FOUR).json({ message: 'not found' });
    
    res.status(FOUR_HUND_TWO).json(sale);
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
