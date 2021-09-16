const rescue = require('express-rescue');
const serviceSales = require('../service/sales');

const createSale = rescue(
  async (req, res) => {
    const { body } = req;
    const sale = await serviceSales.createSale(body);
    return res.status(200).json(sale);
  },
);

module.exports = {
  createSale,
};
