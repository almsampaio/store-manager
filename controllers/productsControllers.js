const productsModel = require('../models/productsModel');
const productsService = require('../services/productsServices');

const createNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const productName = await productsService.verifyProductAlreadyExists(name);
    if (productName) {
        return res.status(422)
        .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
    }
  const create = await productsModel.createNewProduct(name, quantity);
  res.status(201).json(create);
};

const getAllProducts = async (_req, res) => {
    const products = await productsModel.getAllProducts();
    res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (!product) {
 return res.status(422)
  .json({ err: { code: 'invalid_data', message: 'Wrong id format' } }); 
}
 res.status(200).json(product);
};

const UpdateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const update = await productsModel.updateProductById(id, name, quantity);
  res.status(200).json(update);
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getById,
  UpdateProductById,
};
