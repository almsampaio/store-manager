const UNPROCESSABLE_ENTITY_STATUS = 422;

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" must be a string',
      },
    });
  }

  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= 0) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

const validateSaleType = (req, res, next) => {
  const products = req.body;

  for (let index = 0; index < products.length; index += 1) {
    if (typeof products[index].quantity !== 'number') {
      return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  }

  // products.forEach((product) => {
  //   if (typeof product.quantity !== 'number') {
  //     return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
  //       err: {
  //         code: 'invalid_data',
  //         message: 'Wrong product ID or invalid quantity',
  //       },
  //     });
  //   }
  // });

  next();
};

const validateSaleNumbers = (req, res, next) => {
  const products = req.body;

  for (let index = 0; index < products.length; index += 1) {
    if (products[index].quantity <= 0) {
      return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  }

  // products.forEach((product) => {
  //   if (product.quantity <= 0) {
  //     return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
  //       err: {
  //         code: 'invalid_data',
  //         message: 'Wrong product ID or invalid quantity',
  //       },
  //     });
  //   }
  // });

  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateSaleType,
  validateSaleNumbers,
};
