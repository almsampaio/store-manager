const {
  create,
  getAll,
  findById,
  updateSale,
  deleteSale,
} = require('../models/Sales');

const OK_STATUS = 200;
// const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const createSale = async (itensSold) => {
  const sale = await create(itensSold);
  return { status: OK_STATUS, data: sale };
};

const getAllSales = async () => {
  const sales = await getAll();
  return { status: OK_STATUS, data: sales };
};

const findSaleById = async (id) => {
  const sale = await findById(id);

  if (!sale) {
    return {
      status: NOT_FOUND_STATUS,
      message: 'Sale not found',
    };
  }

  return { status: OK_STATUS, data: sale };
};

const update = async (id, itensSold) => {
  const sale = await updateSale(id, itensSold);
  return { status: OK_STATUS, data: sale };
};

const removeSale = async (id) => {
  const sale = await findById(id);

  if (!sale) {
    return {
      status: UNPROCESSABLE_ENTITY_STATUS,
      message: 'Wrong sale ID format',
    };
  }

  const result = await deleteSale(id);
  return { status: OK_STATUS, data: result };
};

module.exports = {
  createSale,
  getAllSales,
  findSaleById,
  update,
  removeSale,
};
