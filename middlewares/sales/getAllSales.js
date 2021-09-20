const salesServices = require('../../services/salesServices');

const notFound = {
  status: 404,
  code: 'not_found',
  message: 'Sale not found',
};

// VALIDAÇÃO DO NOME
// Middleware para validação do nome
const getAllSales = async (_req, res, _next) => {
  try {
    const data = await salesServices.getAll();
    if (!data) throw new Error(notFound.message);
    return res.status(200).json({ sales: data });
  } catch (error) {
    return res.status(notFound.status).json({
      err: { code: notFound.code, message: error.message },
    });
  }
};

module.exports = { getAllSales };