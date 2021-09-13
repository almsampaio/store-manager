const rescue = require('express-rescue');
const { getProductById } = require('../models/ProductsModel');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (e) {
    res.status(422).json({ err: {
      code: 'invalid_data',
      message: e.message },
    });
  }
});
