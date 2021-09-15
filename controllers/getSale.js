const rescue = require('express-rescue');
const { getSaleById } = require('../models/SalesModel');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await getSaleById(id);
    res.status(200).json(sale);
  } catch (e) {
    res.status(404).json({ err: {
      code: 'not_found',
      message: e.message },
    });
  }
});
