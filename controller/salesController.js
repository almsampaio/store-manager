const service = require('../service/salesService');

const addNewSale = async (req, res) => {
  try {
    req.body.forEach((sale) => {
    const { productId, quantity } = sale;
    const operation = service.addNewSale({ productId, quantity });
    res.status(200).json(operation);
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllSales = async (req, res) => {
    try {
      const sales = await service.getAllSales();
      res.status(200).json(sales);
    } catch (error) {
      res.status(400).json(error.message);
    }
};

module.exports = {
    addNewSale,
    getAllSales,
};