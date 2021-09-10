const productsService = require('../services/productsService');

async function getAll(_req, res) {
  const products = await productsService.getAll();
  res.status(200).json(products);
}

async function addProduct(req, res) {
  const { name, quantity } = req.body;
  const addedProduct = await productsService.addProduct({
    name,
    quantity,
  });

  if (addedProduct.message) {
    return res.status(422).json({ err: addedProduct });
  }
  res.status(201).json(addedProduct);
}

module.exports = {
  getAll,
  addProduct,
};
