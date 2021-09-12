const { StatusCodes } = require('http-status-codes');
const { create } = require('../services/productsService');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await create(name, quantity);

    if (result.message) {
      return res.status(result.code)
      .json({
          err: {
            code: 'invalid_data',
            message: result.message,
          },
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};

module.exports = {
  createProduct,
};
