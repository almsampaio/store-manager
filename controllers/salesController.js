const { TWO_HUND,
    TWO_HUND_ONE,
    FOUR_HUND_TWO,
    FOUR_HUND_FOUR, 
    FOUR_HUND_ONE} = require('./consts');
const salesService = require('../services/salesService');

const create = async (req, res) => {

    const { itensSold } = req.body;

    const { errorObject, itensSold }  = await salesService.create(itensSold);

    if (errorObject) return res.status(FOUR_HUND_ONE).json(errorObject);

    res.status(TWO_HUND_ONE).json(sale);
};

const getAll = async (_req, res) => {
    const sales = await salesService.getAll();

    res.status(TWO_HUND).json(sales);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (!sale) return res.status(FOUR_HUND_FOUR).json({ message: "not found"});

    res.status(TWO_HUND).json(sale);
};

const remove = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (!sale) return res.status(FOUR_HUND_FOUR).json({ message: "not found"});
    
    res.status(FOUR_HUND_TWO).json(sale);
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};
