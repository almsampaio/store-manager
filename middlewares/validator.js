const validate = require('../utils/validator');

const product = (req, _res, next) => validate.product(req.body)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

const productExists = async (req, _res, next) => validate.productExists(req.body)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

const productId = (req, _res, next) => validate.productId(req.params.id)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

  const sale = (req, _res, next) => validate.sale([...req.body])
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

const saleExists = (req, _res, next) => validate.saleExists(req.params.id)
  .then(() => next())
  .catch((err) => next({ status: 404, err }));

const saleId = (req, _res, next) => validate.saleId(req.params.id)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

const stock = async (req, _res, next) => validate.stock([...req.body])
  .then(() => next())
  .catch((err) => next({ status: 404, err }));

module.exports = { product, productExists, productId, sale, saleExists, saleId, stock };
