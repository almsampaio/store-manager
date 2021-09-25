const { createSales,
  getAllSales,
  getSaleById,
  updateSalesById,
  deleteSal } = require('../services/Sales');

const addSales = async (req, res) => {
  const saleBody = req.body;
  const sale = await createSales(saleBody);

  if (sale.err) return res.status(sale.status).json({ err: sale.err });

  res.status(200).json(sale);
};

const readSales = async (_req, res) => {
  const sales = await getAllSales();

  res.status(200).json({ sales });
};

const getSaById = async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);

  if (sale.err) return res.status(sale.status).json({ err: sale.err });

  res.status(200).json(sale);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const result = await updateSalesById(sale, id);

  if (result.err) {
    return res.status(result.status).json({ err: result.err });
  }

  res.status(200).json(result);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const sale = await deleteSal(id);

  if (sale.err) return res.status(sale.status).json({ err: sale.err });

  res.status(200).json(sale);
};

module.exports = {
  addSales,
  readSales,
  getSaById,
  updateSales,
  deleteSales,
};