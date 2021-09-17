const saleService = require('../service/saleService');

const HTTP_OK_STATUS = 200;
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

module.exports = {
  create,
};
