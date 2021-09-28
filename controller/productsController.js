const service = require('../service/productsService');
const errors = require('../errors/productErros');

const addNewProduct = async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const operation = await service.addNewProduct({ name, quantity });
      res.status(201).json(operation);
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
};

const getAllProducts = async (_req, res) => {
    try {
      const products = await service.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
};

const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await service.getById(id);
      if (!product) {
        res.status(422).json(errors.wrongId);
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const operation = await service.updateProduct(id, { name, quantity });
    res.status(200).json(operation);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports = {
    addNewProduct,
    getAllProducts,
    getById,
    updateProduct,
};