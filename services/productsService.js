const { productsModel, isObjectId } = require('../models/productsModel');
const InvalidDataError = require('../util/InvalidDataError');
const productSchema = require('../validation/products');

const extractErrorMessage = (validationError) => validationError.details[0].message;

exports.create = async ({ name, quantity }) => {
  const alreadyExists = await productsModel.findOne({ name });
  if (alreadyExists) throw new InvalidDataError('Product already exists');
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    throw new InvalidDataError(extractErrorMessage(error));
  }
  const { _doc: product } = await productsModel.create({ name, quantity });
  return product;
};

exports.getAll = async () => {
  const products = await productsModel.find({});
  return products;
};

exports.get = async ({ id }) => {
  if (!isObjectId(id)) throw new InvalidDataError('Wrong id format');
  const product = await productsModel.findById(id);
  return product;
};

exports.update = async ({ id, name, quantity }) => {
  if (!isObjectId(id)) throw new InvalidDataError('Wrong id format');
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    throw new InvalidDataError(extractErrorMessage(error));
  }
  await productsModel.updateOne({ _id: id }, { name, quantity });
  return productsModel.findById(id);
};

exports.delete = async ({ id }) => {
  if (!isObjectId(id)) throw new InvalidDataError('Wrong id format');
  const product = await productsModel.findById(id);
  const { _id, name, quantity } = product;
  await productsModel.deleteOne({ _id: id });
  return { _id, name, quantity };
};
