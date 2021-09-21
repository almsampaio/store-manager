const salesServices = require('../../services/salesServices');

const notFound = {
  status: 404,
  code: 'not_found',
  message: 'Sale not found',
};

// Middleware para retornar o id da venda (sales)
const getSalesById = async (req, res, _next) => {
  const { id } = req.params;
  try {
    const data = await salesServices.getById(id);
    if (!data) throw new Error(notFound.message);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(notFound.status).json({
      err: { code: notFound.code, message: error.message },
    });
  }
};

module.exports = { getSalesById };