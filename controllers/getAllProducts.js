const rescue = require('express-rescue');
const { getProducts } = require('../models/ProductsModel');

module.exports = rescue(async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (e) {
    res.status(422).json({ err: {
      code: 'invalid_data',
      message: e.message },
    });
  }
});
