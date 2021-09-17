const errorMessage = require('../utils/errorMessage');

const { invalidData, nameMinimumLength, minimumQty,
  qtyMustBeANumber, 
  // productExists, wrongIdFormat 
} = errorMessage;

const {
  // HTTP_OK_STATUS,
  // HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
} = require('../utils/httpStatus');

const validateNome = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 6) {
        console.log('name.length ------- productService', name.length);
        return res.status(HTTP_NO_BODY_STATUS)
          .send({ code: invalidData, message: nameMinimumLength });
      }
    next();
};

const validateQty = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity <= 0) {
        console.log('quantity ------- productService', quantity);
        return res.status(HTTP_NO_BODY_STATUS).send({ code: invalidData, message: minimumQty });
      }
      if (typeof quantity !== 'number') {
        console.log('typeof quantity ------- productService', typeof quantity);
        return res.status(HTTP_NO_BODY_STATUS)
          .send({ code: invalidData, message: qtyMustBeANumber });
      }
    next();
};

module.exports = {
  validateNome,
  validateQty,
};
