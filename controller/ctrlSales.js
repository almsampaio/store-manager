const salesService = require('../service/servSales');

const create = async (req, res) => {
  // console.log('chegou do body', req.body);
  const sale = await salesService.create(req.body);
  // console.log('chegou de sevModSale', sale);
  if (sale.err) return res.status(422).json(sale);
  return res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const saless = await salesService.getAll();
  console.log(saless);
  return res.status(200).json({ sales: saless });
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log('chegou da requisião', id);
  const sale = await salesService.getById(id);
  console.log('chegou no ctrl atravez de getbyid no serv', sale);
  if (sale.err) return res.status(404).json(sale);
  return res.status(200).json(sale);
};

module.exports = {
  getAll,
  getById,
  create,
 /*  editById,
  deleteById, */
};
