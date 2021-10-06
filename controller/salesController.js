const service = require('../service/salesService');
const errors = require('../errors/salesErrors');

const addNewSale = async (req, res) => {
  try {
    const newSales = [];
    await req.body.forEach(async ({ productId, quantity }) => {
      const sale = { productId, quantity };
      newSales.push(sale);
    });
    const sale = { itensSold: newSales };
    const operation = await service.addNewSale(sale);
    res.status(200).json(operation);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllSales = async (_req, res) => {
    try {
      const sales = await service.getAllSales();
      res.status(200).json({ sales });
    } catch (error) {
      res.status(400).json(error.message);
    }
};

const getSalesById = async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await service.getSalesById(id);
      if (sale.length === 0) {
        res.status(404).json(errors.notFound);
      }
      res.status(200).json(sale);
    } catch (error) {
      res.status(400).json(error);
    }
};

const updateSale = async (req, res) => {
    try {
      const { id } = req.params;
      const newItensSold = req.body;
      const operation = await service.updateSale(id, newItensSold);
      res.status(200).json(operation);
    } catch (error) {
      res.status(400).json(error.message);
    }
};

const deleteSale = async (req, res) => {
    try {
      const { id } = req.params;
      const operation = await service.deleteSale(id);
      res.status(200).json(operation);
    } catch (error) {
      res.status(400).json(error.message);
    }
};

module.exports = {
    addNewSale,
    getAllSales,
    getSalesById,
    updateSale,
    deleteSale,
};