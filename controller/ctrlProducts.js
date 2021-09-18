const service = require('../service/servProducts');

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const createdProduct = await service.validaCreateProducts(name, quantity);
    console.log(createdProduct);
    return res.status(201).json(createdProduct);
  } catch (error) {
    return next(error);
  }
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
