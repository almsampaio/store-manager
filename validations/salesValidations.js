const { ObjectId } = require('mongodb');
const { getById } = require('../services/productsService');
const { getSalesById } = require('../services/salesService');
const errors = require('../errors/salesErrors');

const validateInsertedData = async (req, res, next) => {
  await req.body.forEach(async (sale) => {
      const { productId, quantity } = sale;
      if (typeof quantity !== 'number') {
        return res.status(422).json(errors.invalidData);
      } if (quantity <= 0) {
        return res.status(422).json(errors.invalidData);
      } if (!ObjectId.isValid(productId)) {
        return res.status(422).json(errors.invalidData);
      }
    });
  next();
};

const validateUpdatedData = async (req, res, next) => {
  const { productId, quantity } = req.body;
      if (typeof quantity !== 'number') {
        return res.status(422).json(errors.invalidData);
      } if (quantity <= 0) {
        return res.status(422).json(errors.invalidData);
      } if (!ObjectId.isValid(productId)) {
        return res.status(422).json(errors.invalidData);
      }
  next();
};

const validateID = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json(errors.notFound);
  }
  next();
};

const validateIdOnDelete = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422).json(errors.notFoundDelete);
  }
  next();
};

const validateQtdOnProd = async (req, res, next) => {
  const newSales = req.body;
  newSales.forEach(({ productId }) => {
    const product = getById(productId);
    if (product.quantity === 0) {
      return res.status(422).json(errors.outOfStock);
    }
  next();
  });
};

const validateQtd = async (req, res, next) => {
  const newSales = req.body;
  if (newSales.some(({ quantity }) => quantity < 0 || quantity >= 100)) {
    res.status(404).json(errors.stockProblem);
  }
  next();
};

const validateExistenceSale = async (req, res, next) => {
  const { id } = req.params;
  const search = await getSalesById(id);
  if (search.length === 0) {
    return res.status(404).json(errors.notFound);
  }
  next();
};

module.exports = {
  validateInsertedData,
  validateUpdatedData,
  validateID,
  validateIdOnDelete,
  validateExistenceSale,
  validateQtdOnProd,
  validateQtd,
};