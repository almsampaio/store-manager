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
  res.status(200).json(sale);
  };

const remove = async (req, res) => {
  const sale = await saleService.getById(req.params.id);
  console.log(sale);
  if (!sale) {
  return res.status(422)
  .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } }); 
} 
await saleService.remove(req.params.id);
res.status(200).json(sale);
};

  module.exports = {
    register,
    getAll,
    getById,
    update,
    remove,
}; 