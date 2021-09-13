const rescue = require('express-rescue');
const { updateProduct } = require('../models/ProductsModel');
const { validateProduct } = require('../services/ProductServices');

module.exports = [
  (req, _res, next) => {
    const { name, quantity } = req.body;

    const { error } = validateProduct(name, quantity);

    if (error) {
      return next(error);
    }

    next();
  },

  rescue(async (req, res) => {
    try {
      const product = await updateProduct(req);
      res.status(200).json(product);
    } catch (e) {
      res.status(422).json({ err: {
        code: 'invalid_data',
        message: e.message },
      });
    }
  }),
];
