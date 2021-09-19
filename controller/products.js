const { create } = require('../service/products');

const createProducts = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await create(name, quantity);
    return res.status(product.statusCode).json(product.json);
  };

module.exports = {
    createProducts,
};