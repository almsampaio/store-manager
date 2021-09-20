const messageErro = require('../utils/errosMsg');

const validateSale = async (req, res, next) => {
  const sales = req.body;

  for (let index = 0; index < sales.length; index += 1) {
    if (typeof sales[index].quantity !== 'number') {
      return res.status(422).json(messageErro.wrongProductId);
    }
    if (sales[index].quantity <= 0) {
      return res.status(422).json(messageErro.wrongProductId);
    }
  }

  next();
};

module.exports = { validateSale };
