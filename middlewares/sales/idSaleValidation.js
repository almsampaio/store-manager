const salesServices = require('../../services/salesServices');

const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong sale ID format',
};

// VALIDAÇÃO DO NOME
// Middleware para verificar se o id da venda (sales) existe
const idSaleValidation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await salesServices.getById(id);
    if (!data) throw new Error(unprocessable.message);
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
  next();
};

module.exports = { idSaleValidation };
