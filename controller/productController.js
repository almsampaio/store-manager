const productService = require('../service/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
    const { err, data } = await productService.create(name, quantity);
    if (err) return res.status(422).json({ err });
    return res.status(201).json(data);
};

module.exports = {
  create,
};
