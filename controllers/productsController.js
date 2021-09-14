const { StatusCodes } = require('http-status-codes');
const productsService = require('../services/productsService');

exports.create = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const product = await productsService.create({ name, quantity });
    return res.status(StatusCodes.CREATED).json(product);
  } catch (e) {
    return res.status(e.code).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
/*   productsService.create({ name, quantity })
    .then((product) => res.status(StatusCodes.CREATED).json(product))
    .catch((e) => res.status(e.code).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    )); */
};

exports.getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    return res.status(StatusCodes.OK).json({ products });
  } catch (e) {
    return res.status(e.code).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.get = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productsService.get({ id });
    return res.status(StatusCodes.OK).json(products);
  } catch (e) {
    return res.status(e.code).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const products = await productsService.update({ id, name, quantity });
    return res.status(StatusCodes.OK).json(products);
  } catch (e) {
    return res.status(e.code).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productsService.delete({ id });
    return res.status(StatusCodes.OK).json(products);
  } catch (e) {
    return res.status(e.code).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};
