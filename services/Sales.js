const Sale = require('../models/Sale');

const create = async (sales) => Sale.create(sales);

const getAllSales = async () => Sale.getAllSales();

const findById = async (id) => {
    const sale = await Sale.findById(id);
    if (!sale) {
      return {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      };
    }
    return sale;
};
const update = async (id, data) => Sale.update(id, data);

const deleteSale = async (id) => Sale.deleteSale(id);

module.exports = {
  create,
  getAllSales,
  findById,
  deleteSale,
  update,
};