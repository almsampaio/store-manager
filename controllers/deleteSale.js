const rescue = require('express-rescue');
const { deleteSaleModel } = require('../models/SalesModel');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await deleteSaleModel(id);
    console.log(sale);
    res.status(200).json(sale);
  } catch (e) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      },
    });
  }
});
