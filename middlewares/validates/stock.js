const {
  HTTP_NOT_FOUND,
} = require('../../schemas/status');

const {
  readByIdServicesProducts,
} = require('../../services/sales/salesServices');

const validateStock = async (req, res, next) => {
  const products = req.body;

  await Promise.all(products.map(async ({ productId, quantity }) => {
    const { calcSimulate } = await readByIdServicesProducts(productId, quantity);
    
    if (calcSimulate < 0) {
      return res.status(HTTP_NOT_FOUND).json({
        err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
      });
    }

    next();
  }));
};

module.exports = { validateStock };