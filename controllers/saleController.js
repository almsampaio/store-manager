const saleService = require('../services/saleSercive');

const HTTP_OK_STATUS = 200;

const register = async (req, res) => {
  const sales = req.body;
  
  const { _id } = await saleService.register(sales);
  const result = { _id, itensSold: sales };
  res.status(HTTP_OK_STATUS).json(result);
  };

const getAll = async (_req, res) => {
  const sales = await saleService.getAll();
  
  res.status(HTTP_OK_STATUS).json({ sales });
  };
const getById = async (req, res) => {
  const sale = await saleService.getById(req.params.id);
  
  if (!sale) {
   return res.status(404)
    .json({ err: { code: 'not_found', message: 'Sale not found' } }); 
}
};

const update = async (req, res) => {
  const { id } = req.params;
  const { quantity, productId } = req.body[0];

  const sale = await saleService.update(id, quantity, productId);
  console.log(sale);
  res.status(200).json(sale);
  };

  module.exports = {
    register,
    getAll,
    getById,
    update,
}; 