const rescue = require('express-rescue');
const serviceSales = require('../service/sales');

const createSale = rescue(
  async (req, res) => {
    const { body } = req;
    const sale = await serviceSales.createSale(body);
    return res.status(200).json(sale);
  },
);

const findSales = rescue(
  async (_req, res) => {
    const sales = await serviceSales.findSales();
    return res.status(200).json({ sales });
  },
);

const findSalesId = rescue(
  async (req, res) => {
    const { id } = req.params;
    const sales = await serviceSales.findSalesId(id);
    return res.status(200).json(sales);
  },
);

const updateSale = rescue(
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const update = await serviceSales.updateSale(id, body);
    return res.status(200).json(update);
  },
);

module.exports = {
  createSale,
  findSales,
  findSalesId,
  updateSale,
};
