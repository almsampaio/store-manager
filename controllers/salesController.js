const saleService = require('../services/salesService');

const {
  invalidData,
  // saleExists,
  // minimumQty,
  // qtyMustBeANumber,
//   wrongIdFormat,
  // nameMinimumLength,
  // problemIdOrQty,
  notFound,
  saleNotFound,
  wrongSaleIdFormat,
  // amountNotpermitted,
  // stockProblem,
} = require('../utils/errorMessage');

const getAll = async (_req, res) => {
  const allsales = await saleService.getAll();
  return res.status(200).send({ sales: allsales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);
  if (!sale) {
 return res.status(404)
  .json({ err: { code: notFound, message: saleNotFound } }); 
}
  return res.status(200).send(sale);
};

const create = async (req, res) => {
  const selected = req.body;
  console.log('selected  - - - -CONTROLER', selected);
  const sale = await saleService.create(selected);
  console.log('sale  - - - -CONTROLER', sale);
  console.log('sale  ERROOO- - - -CONTROLER', sale.err);
//   if (!sale.err.code) return res.status(200).json(sale.saleCreated);
//   return res.status(422).json(sale);
if (sale.err) return res.status(422).json(sale);
return res.status(200).json(sale.saleCreated);
};

// const actualize = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const sale = await saleService.actualize(name, quantity, id);
//   if (sale.err) return res.status(422).json(sale);
//   return res.status(200).json(sale);
// };

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, sale } = await saleService.remove(id);
  if (!sale) {
 return res.status(status)
    .json({ err: { code: invalidData, message: wrongSaleIdFormat } }); 
}
  return res.status(status).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
//   actualize,
  remove,
};