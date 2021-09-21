const { ObjectId } = require('mongodb');

const ProductModel = require('../../models/Products');

const saleSchema = require('../../schemas/sale');

const validateSale = ({ productId, quantity }) => {
  const { error } = saleSchema.validate({ productId, quantity });

  if (error) return false;

  if (!ObjectId.isValid(productId)) return false;

  const productExists = ProductModel.getById(productId);

  if (!productExists) return false;

  return true;
};

module.exports = validateSale;
