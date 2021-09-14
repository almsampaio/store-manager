// const { ObjectId } = require('mongodb');
const saleService = require('../service/saleService');

const create = async (req, res) => {
  const { body } = req;
  const sales = await saleService.create(body);

  return res.status(200).json(sales);
};

module.exports = {
  create,
};
