const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

// Verifica se a quantidade é válida
const validQuantity = (productsSold) => productsSold.every((ele) => (
  typeof ele.quantity === 'number'
  && ele.quantity > 0
  && ele.quantity !== undefined
  && ele.quantity !== null));

// Middleware para verificar se a quantidade informada é válida
const quantityValidation = async (req, res, next) => {
  const productsSold = req.body;
  const quantityIsValid = validQuantity(productsSold);
  try {
    if (!quantityIsValid) { throw new Error(unprocessable.message); }
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
  next();
};

module.exports = { quantityValidation };
