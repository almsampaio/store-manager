const salesServices = require('../../services/salesServices');

// const unprocessable = {
//   status: 422,
//   code: 'invalid_data',
//   message: 'Wrong product ID or invalid quantity',
// };

// Middleware para o cadastro de vendas (sales)
const removeSales = async (req, res, _next) => {
  const { id } = req.params;
  // try {
    const data = await salesServices.remove(id);
    // if (!data) throw new Error(unprocessable.message);
    return res.status(200).json(data);
  // } catch (error) {
  //   return res.status(unprocessable.status).json({
  //     err: { code: unprocessable.code, message: error.message },
  //   });
  // }
};

module.exports = { removeSales };
