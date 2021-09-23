const { TWO_HUND,
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
    const { status, data } = await salesService.getAll();
    res.status(status).json({ sales: data });
};

const getById = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (!sale) {
        return res.status(FOUR_HUND_FOUR).json({
        err: { code: 'not_found', message: 'Sale not found' },
    });
}

    res.status(TWO_HUND).json(sale);
};

const update = async (req, res) => {
    const { id } = req.params;
    const { err, updatedSale } = await salesService.update(id, req.body);

    if (err) return res.status(FOUR_TWO_TWO).json({ err });

    res.status(TWO_HUND).json(updatedSale);
};

const remove = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (!sale) {
        return res.status(FOUR_TWO_TWO).json({
        err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format' } });
        }
    await salesService.remove(id);
    
    res.status(TWO_HUND).json(sale);
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update,
};
