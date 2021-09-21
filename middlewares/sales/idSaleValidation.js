const salesServices = require('../../services/salesServices');

const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

// VALIDAÇÃO DO NOME
// Middleware para validação do nome
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
