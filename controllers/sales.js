const serviceSales = require('../services/sales');
const status = require('../services/status');

// const getAll = async (req, res) => {
//   const allSales = await serviceSales.getAll();
//   return allSales;
// };

const inputSales = async (req, res) => {
  const salesArray = req.body;
  const newSale = await serviceSales.inputSales(salesArray);
  // if (inputSales.err) return res.status(status.UNPROCESSABLE_ENTITY).json(newSale);
  return res.status(status.HTTP_OK_STATUS).json(newSale);
};

module.exports = {
  // getAll,
  inputSales,
};
