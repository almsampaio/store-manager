const saleService = require('../service/saleService');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const itensSoldArray = req.body;
  const { err, sales } = await saleService.create(itensSoldArray);
  if (err) {
  return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
    .json({ err }); 
  }
  res.status(HTTP_OK_STATUS).json(sales);
};

const getAll = async (_req, res) => {
  const sales = await saleService.getAll();
  return res.status(HTTP_OK_STATUS).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { err, sale } = await saleService.getById(id);
  if (err) {
    return res.status(HTTP_NOT_FOUND_STATUS)
      .json({ err }); 
  }
  res.status(HTTP_OK_STATUS).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const updatedItensSoldArray = req.body;
  const { err, sale } = await saleService.update(id, updatedItensSoldArray);
  if (err) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ err }); 
  }
  res.status(HTTP_OK_STATUS).json(sale);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { err } = await saleService.remove(id);
  if (err) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ err }); 
  }
  res.status(HTTP_OK_STATUS).end();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
