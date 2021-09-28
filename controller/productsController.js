const service = require('../service/productsService');

const addNewProduct = async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const operation = await service.addNewProduct({ name, quantity });
      res.status(201).json(operation);
    } catch (error) {
      res.status(400).json(error);
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

module.exports = {
    addNewProduct,
    getAllProducts,
};