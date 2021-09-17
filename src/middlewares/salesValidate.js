const newSaleSchema = require('../schemas/newSaleSchema');

const newSaleValidate = async (req, _res, next) => {
  const { body } = req;
  
  const { error } = newSaleSchema.validate(body);

  if (error) return next(error);

  next();
};

module.exports = newSaleValidate;