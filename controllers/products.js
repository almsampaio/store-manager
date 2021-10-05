const products = require('../services/products');

const create = (req, res) => products.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = (_req, res) => products.getAll()
  .then(({ status, data }) => res.status(status).json({ products: data }));

const getById = (req, res) => products.getById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

const update = (req, res) => products.update(req.params.id, req.body)
  .then(({ status }) => res.status(status).json({ _id: req.params.id, ...req.body }));

const remove = (req, res) => products.remove(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
