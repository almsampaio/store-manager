const { ObjectId } = require('mongodb');

function quantityMustBeGreateThenOne(quantity) {
  if (Number(quantity) < 1) {
    return true;
  }
}

function quantityMustBeANumber(quantity) {
  if (typeof quantity === 'string') {
    return true;
  }
}

function isValidId(id) {
  if (id && !ObjectId.isValid(id)) {
    return true;
  }
}

function productValidation(req, res, next) {
  const sales = req.body;

  sales.forEach((sale) => {
    const { _id, quantity } = sale;

    const notValid = quantityMustBeANumber(quantity) 
    || quantityMustBeGreateThenOne(quantity)
    || isValidId(_id);

    if (notValid) {
      return res.status(422).json({ err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } });
    }
  });

  next();
}

module.exports = { productValidation };