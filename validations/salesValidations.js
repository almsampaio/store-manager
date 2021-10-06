const { ObjectId } = require('mongodb');
const { getSalesById } = require('../service/salesService');
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
};