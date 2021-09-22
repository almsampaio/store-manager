const { TWO_HUND,
    TWO_HUND_ONE,
    FOUR_TWO_TWO } = require('./consts');

const productsService = require('../services/productsService');

const create = async (req, res) => {
    const { name, quantity } = req.body;

    const { err, product } = await productsService.create(name, quantity);

    if (err) return res.status(FOUR_TWO_TWO).json({ err });

    res.status(TWO_HUND_ONE).json(product);
};

const getAll = async (_req, res) => {
    const products = await productsService.getAll();

    res.status(TWO_HUND).json(products);
};

const getById = async (req, res) => {
    const product = await productsService.getById(req.params.id);

    if (!product) {
        return res.status(FOUR_TWO_TWO).json({
        err: { code: 'invalid_data', message: 'Wrong id format' },
    }); 
}

    res.status(TWO_HUND).json(product);
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { err, product } = await productsService.update(id, name, quantity);

    if (err) return res.status(FOUR_TWO_TWO).json({ err });

    res.status(TWO_HUND).json(product);
};

const remove = async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getById(id);

    if (!product) {
        return res.status(FOUR_TWO_TWO).json({ err: {
        code: 'invalid_data', message: 'Wrong id format',
    } });
}

    await productsService.remove(id);

    res.status(TWO_HUND).json(product);
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update,
};
