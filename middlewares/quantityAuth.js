module.exports = (req, res, next) => {
  const { quantity } = req.body;
  const code = 'invalid_data';
  const errType = 422;
  const minValue = 0;

  if (typeof quantity !== 'number') {
    return next({
      err: { message: '"quantity" must be a number', code, data: { errType },
      },
    });
  }

  if (quantity <= minValue) {
    return next({
      err: { message: '"quantity" must be larger than or equal to 1', code, data: { errType },
      },
    });
  }

  return next();
};
