// const { ObjectId } = require('mongodb');
const Sales = require('../services/Sales');

async function createSales(req, res) {
  const sales = [...req.body];
  const createdSales = await Sales.createSales(sales);

  res.status(200).json(createdSales);
}

module.exports = {
  createSales,
};
