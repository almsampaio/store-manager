const {
  create,
  findByName,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
} = require('../models/Products');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const createProduct = async (name, quantity) => {
  const doesProductExist = await findByName(name);

  if (doesProductExist) {
  return {
    status: UNPROCESSABLE_ENTITY_STATUS,
    message: 'Product already exists',
  }; 
}

  const product = await create(name, quantity);
  return { status: CREATED_STATUS, data: product };
};

const getAllProducts = async () => {
  const products = await getAll();
  return { status: OK_STATUS, data: products };
};

const findProductsById = async (id) => {
  const product = await findById(id);

  if (!product) {
    return {
      status: UNPROCESSABLE_ENTITY_STATUS,
      message: 'Wrong id format',
    };
  }

  return { status: OK_STATUS, data: product };
};

const update = async (id, name, quantity) => {
  const product = await updateProduct(id, name, quantity);
  return { status: OK_STATUS, data: product };
};

const removeProduct = async (id) => {
  const product = await findById(id);

  if (!product) {
    return {
      status: UNPROCESSABLE_ENTITY_STATUS,
      message: 'Wrong id format',
    };
  }

  const result = await deleteProduct(id);
  return { status: OK_STATUS, data: result };
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductsById,
  update,
  removeProduct,
};
