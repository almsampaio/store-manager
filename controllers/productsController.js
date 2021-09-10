const { StatusCodes } = require('http-status-codes');
const productsService = require('../services/productsService');

exports.create = async (req, res, _next) => {
    const { name, quantity } = req.body;
    try {
        const product = await productsService.create({ name, quantity });
        return res.status(StatusCodes.CREATED).json(product);
    } catch (e) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
          { err: {
            code: e.name,
            message: e.message,
          } },
          );
    }
};
