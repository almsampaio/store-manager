const ProductModel = require('../models/ProductModel');
const ProductSchema = require('../schemas/ProductSchema');

// ProductSchema.validate;

const create = async ({ name, quantity }) => {
  if (ProductSchema.validate(name, quantity).err) {
    return ProductSchema.validate(name, quantity);
  }

  const product = await ProductModel.create({ name, quantity });

  return product;
};

module.exports = {
  create,
};

// console.log(create({ name: 'coaac', quantity: 1 }).then((data) => console.log(data)));