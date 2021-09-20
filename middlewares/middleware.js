const {
  invalidData,
  // productExists,
  minimumQty,
  qtyMustBeANumber,
  // wrongIdFormat,
  nameMinimumLength,
  // problemIdOrQty,
  // notFound,
  // saleNotFound,
  // wrongSaleIdFormat,
  // amountNotpermitted,
  // stockProblem,
} = require('../utils/errorMessage');

const {
  // HTTP_OK_STATUS,
  // HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
} = require('../utils/httpStatus');

const validateNome = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 6) {
        return res.status(HTTP_NO_BODY_STATUS)
          .send({ code: invalidData, message: nameMinimumLength });
      }
    next();
};

const validateQty = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity <= 0) {
        return res.status(HTTP_NO_BODY_STATUS).send({ code: invalidData, message: minimumQty });
      }
      if (typeof quantity !== 'number') {
        return res.status(HTTP_NO_BODY_STATUS)
          .send({ code: invalidData, message: qtyMustBeANumber });
      }
    next();
};

module.exports = {
  validateNome,
  validateQty,
};
