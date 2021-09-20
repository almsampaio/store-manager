const ProductsModel = require('../models/ProductsModel');

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const productAlreadyExists = async (name) => {
  const product = await ProductsModel.findByName(name);

  if (product.length > 1) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return true;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const isNameValid = (name) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  return true;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const isQuantityValid = (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  return true;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const create = async (name, quantity) => {
  const newProduct = await ProductsModel.create(name, quantity);
  const productExists = await productAlreadyExists(name);
  const nameValid = isNameValid(name);
  const quantityValid = isQuantityValid(quantity);

  if (productExists.err) return productExists;
  if (nameValid.err) return nameValid;
  if (quantityValid.err) return quantityValid;

  return newProduct;
};

const getAll = async () => {
  const productsList = await ProductsModel.getAll();

  return productsList;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const getById = async (id) => {
  const product = await ProductsModel.getById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const update = async (id, name, quantity) => {
  const updatedProduct = await ProductsModel.update(id, name, quantity);
  const nameValid = isNameValid(name);
  const quantityValid = isQuantityValid(quantity);

  if (nameValid.err) return nameValid;
  if (quantityValid.err) return quantityValid;

  return updatedProduct;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const remove = async (id) => {
  const removedProduct = await ProductsModel.remove(id);

  if (!removedProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return removedProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
