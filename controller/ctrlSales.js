const salesService = require('../service/servSales');

const create = async (req, res) => {
  console.log('chegou do body', req.body);
  const sale = await salesService.create(req.body);
  console.log('chegou de sevModSale', sale);
  if (sale.err) return res.status(422).json(sale);
  return res.status(200).json(sale);
};

module.exports = {
/*   getAll,
  getById, */
  create,
 /*  editById,
  deleteById, */
};
