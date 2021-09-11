const saleSchema = require('../../schemas/saleSchema');

const authSales = async (req, _res, next) => {
  const sales = req.body;

  sales.forEach((sale) => {
    const { error } = saleSchema.validate(sale);

    if (error) {
      // ALERTA GAMBIARRA
      if (error.details[0].message.includes('must be a number')) {
        error.details[0].message = 'Wrong product ID or invalid quantity';
      }

      return next(error);
    }
  });

  next();
};

module.exports = authSales;
