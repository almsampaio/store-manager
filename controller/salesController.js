const service = require('../service/salesService');

const addNewSale = async (req, res) => {
  try {
    const newSales = [];
    await req.body.forEach(({ productId, quantity }) => {
      const sale = { productId, quantity };
      newSales.push(sale);
    });
    const operation = await service.addNewSale(newSales);
    res.status(200).json(operation);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllSales = async (_req, res) => {
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