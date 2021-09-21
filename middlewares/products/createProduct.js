const productServices = require('../../services/productsServices');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const data = await productServices.create(name, quantity);
    return res.status(201).json(data);
};

module.exports = { createProduct };
