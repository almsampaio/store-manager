const productModel = require('../../models/Products');

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = productModel.update(id, { name, quantity });

  res.status().json(updatedProduct);
};

module.exports = updateProduct;
