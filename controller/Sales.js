const { createSales } = require('../services/Sales');

const addSales = async (req, res) => {
  const saleBody = req.body;
  const sale = await createSales(saleBody);

  if (sale.err) return res.status(sale.status).json({ err: sale.err });

  res.status(200).json(sale);
};

module.exports = {
  addSales,
};