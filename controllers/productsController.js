const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const create = rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const product = await productsService.create(name, quantity);

    if (product.err) return res.status(422).json(product);
 
    //   console.log(product);
   
    res.status(201).json(product);
});

const getAll = rescue(async (_req, res) => {
    const products = await productsService.getAll();

    res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getById(id);

    if (product.err) return res.status(422).json(product);

    res.status(200).json(product);
});

module.exports = {
    create,
    getAll,
    getById,
};