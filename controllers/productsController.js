const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const create = rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const product = await productsService.create(name, quantity);

    if (product.err) return res.status(422).json(product);
    console.log(product);
    res.status(201).json(product);
});

module.exports = {
    create,
};