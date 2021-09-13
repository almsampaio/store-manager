const productsService = require('../Services/productsService');

const HTTP_STATUS_CREATED = 201;

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
   
  const product = await productsService.addProduct(name, quantity);
  if (product.err) {
    return res.status(422).json(product);
  }

 return res.status(HTTP_STATUS_CREATED).json(product);
};

module.exports = {
  addProduct,
};