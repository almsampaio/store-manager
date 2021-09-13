const rescue = require('express-rescue');
const { addProduct } = require('../models/ProductsModel');
const { validateProduct } = require('../services/ProductServices');

module.exports = [
  (req, res, next) => {
    const { name, quantity } = req.body;

    const { error } = validateProduct(name, quantity);

    if (error) {
      return next(error);
    }

    next();
  },

  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    try {
      const product = await addProduct(name, quantity);
      res.status(201).json(product);
    } catch (e) {
      res.status(422).json({ err: {
        code: 'invalid_data',
        message: e.message },
      });
    }
  }),
];
