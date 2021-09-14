const salesService = require('../services/checkSales');

const addSale = async (req, res) => {
  const itens = req.body;
  const newSale = await salesService.addSales(itens);
  if (!newSale.error) return res.status(200).json(newSale);
  return res.status(newSale.error).json(newSale);
};

const getSales = async (req, res) => {
  const allSales = await salesService.getAll();
  return res.status(200).json({ sales: allSales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (!sale) {
 return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
}
  return res.status(200).json(sale);
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const itens = req.body;
  const updateSale = await salesService.update(id, itens);
  if (updateSale.error) {
    return res.status(422).json(updateSale);
  }

  return res.status(200).json(updateSale);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const deleteSale = await salesService.drop(id);
  if (deleteSale.error) {
    return res.status(422).json(deleteSale);
  }

  return res.status(200).json(deleteSale);
};

module.exports = {
  addSale,
  getSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
