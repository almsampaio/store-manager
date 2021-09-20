const Sales = require('../services/SalesServices');

const createNewSales = async (req, res) => {
  const data = req.body;
  const response = await Sales.createNewSales(data);
  console.log(response);
  if (response.err) {
    return res.status(422).json(response);
  }
  return res.status(200).json(response);
};

module.exports = { createNewSales };