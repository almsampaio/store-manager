module.exports = (req, _res, next) => {
  const itensSold = req.body;  
  const minQuantity = 0;
  const message = 'Wrong product ID or invalid quantity';
  const code = 'invalid_data';
  const errType = 422;

  const isQuantitiesValid = itensSold
    .map(({ quantity }) => quantity)
    .every((quantity) => typeof quantity === 'number' && quantity > minQuantity);

  if (!isQuantitiesValid) {
 return next({
    err: {
      message,
      code,
      data: { errType },
    },
  }); 
}

  next();
};
