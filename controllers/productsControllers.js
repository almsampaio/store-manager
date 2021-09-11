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

module.exports = {
  createNewProduct,   
};
