const {
  HTTP_UNPROCESSABLE_ENTITY,
} = require('../../schemas/status');

const {
  readByIdServices,
  updateAddProductsServices,
} = require('../../services/sales/salesServices');

const addProducts = async (req, res, next) => {
  const { id } = req.params;
  const { data } = await readByIdServices(id);

  if (!data) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json(
      {
        err:
        {
          code: 'invalid_data', message: 'Wrong sale ID format',
        },
      },
    );
  }

  const products = data.itensSold;

  await Promise
    .all(products
      .map(async ({ productId, quantity }) => updateAddProductsServices(productId, quantity)));

  next();
};

module.exports = { addProducts };