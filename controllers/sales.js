const rescue = require('express-rescue');
const { salesServices } = require('../services');
const { status, code, message } = require('../schema');

const addSales = rescue(async (req, res) => {
  const itensSold = req.body;
  const registerItens = await salesServices.addSales(itensSold);
  return res.status(status.status.ok).json(registerItens);
});

const findSales = async (_req, res) => {
  const getAll = await salesServices.findSales();
  return res.status(status.status.ok).json({ sales: getAll });
};

const findSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.findSale(id);
  if (!sale) {
    return res.status(status.status.notFound)
    .json({ err: { code: code.code.notFound, message: message.message.saleNotFound } });
  }
  return res.status(status.status.ok).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  await salesServices.updateSale(id, itensSold);
  return res.status(status.status.ok).json({ _id: id, itensSold });
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const idLength = 24;
  if (!id || id.length !== idLength) {
    return res.status(status.status.unprocessable)
      .json({ err: { code: code.code.invalidData, message: message.message.wrongSaleIdFormat } });
  }
  const sale = await salesServices.findSale(id);
  if (!sale) {
    return res.status(status.status.notFound)
    .json({ err: { code: code.code.notFound, message: message.message.saleNotFound } });
  }
  
  await salesServices.deleteSale(id);
  return res.status(status.status.ok).json(sale);
});

module.exports = {
  addSales,
  findSales,
  findSale,
  updateSale,
  deleteSale,
};
