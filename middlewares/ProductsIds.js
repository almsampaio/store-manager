const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;
const idLength = 24;

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== idLength) {
 return res.status(UNPROCESSABLE_ENTITY).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  }); 
}

  next();
};

const validateSaleId = (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== idLength) {
 return res.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  }); 
}

  next();
};

module.exports = {
    validateId,
    validateSaleId,
};
