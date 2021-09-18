const service = require('../service/servProducts');

const createProduct = async (req, res, _next) => {
    const { name, quantity } = req.body;
    const createdProduct = await service.validaCreateProducts(name, quantity);
    if (createdProduct.err) return res.status(422).json(createdProduct);
    return res.status(201).json(createdProduct);
};

const getAll = async (req, res) => {
  try {
    const getAllProducts = await service.getAllProducts();
    return res.status(200).json(getAllProducts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  createProduct,
};
