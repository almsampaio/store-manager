const { create } = require('../service/products');

const createProducts = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await create(name, quantity);
    // console.log(product);
    return res.status(422).json(product.json);
  };

module.exports = {
    createProducts,
};