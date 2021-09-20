const { ObjectId } = require('mongodb');

const db = require('../models/productsModel');

const doesItAlreadyExist = async (name) => {
  const alreadyExists = await db.findProductByName(name);
    if (alreadyExists) {
      return ({
        err: {
          code: 'invalid_data', message: 'Product already exists', 
        },
      }); 
    }
  return true;
};

const isValidName = async (name) => {
  switch (true) {
    case typeof (name) !== 'string':
      return { err: { code: 400, message: 'name is not valid.' } };
    case name.length <= 5:
      return { err: { code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' } };
    default:
      return true;
  }
};

const isValidQuantity = (quantity) => {
  switch (true) {
    case typeof (quantity) !== 'number' && !Number.isInteger(quantity):
      return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
    case quantity <= 0:
      return { err: { code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' } };
    default:
      return true;
  }
};

const createNewProductValidations = async (name, quantity) => {
  const productAlreadyExist = await doesItAlreadyExist(name);
  const nameValidations = await isValidName(name);
  const quantityValidations = isValidQuantity(quantity);
  
  if (productAlreadyExist.err) return productAlreadyExist;
  
  if (nameValidations.err) return nameValidations;
  
  if (quantityValidations.err) return quantityValidations;

  return true;
};

const createNewProduct = async (name, quantity) => {
  const allValidations = await createNewProductValidations(name, quantity);
  if (!allValidations.err) {
    const response = await db.createNewProduct(name, quantity);
    return response;
  }
  return allValidations;
};

const getAllProducts = async () => {
  const products = await db.getAllProducts();
  return products;
};

const validateID = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return true;
};

const getProductByID = async (id) => {
  if (validateID(id).err) return validateID(id);
  const products = await db.getProductByID(id);
  if (products) {
    return products;
  } 
  return {
    err: {
      code: 'invalid_data', message: 'Id does not exist',
    },
  };
};

const updateProductByIDValidations = async (id, name, quantity) => {
  const isValidID = validateID(id);
  const nameValidations = await isValidName(name);
  const quantityValidations = isValidQuantity(quantity);
  const alreadyExist = await getProductByID(id);

  if (isValidID.err) return isValidID;
  
  if (nameValidations.err) return nameValidations;
  
  if (quantityValidations.err) return quantityValidations;

  if (alreadyExist.err) return alreadyExist;

  return true;
};

const updateProductByID = async (id, name, quantity) => {
  const allValidations = await updateProductByIDValidations(id, name, quantity);
  
  if (allValidations.err) return allValidations;

  const updatedProduct = await db.updateProductByID(id, name, quantity);

  if (updatedProduct) {
    return updatedProduct;
  } 
  return {
    err: {
      code: 'invalid_data', message: 'Id does not exist',
    },
  };
};

const deleteProductByIDValidations = async (id) => {
  const alreadyExist = await getProductByID(id);
  
  if (alreadyExist.err) return alreadyExist;

  return alreadyExist;
};

const deleteProductByID = async (id) => {
  const allValidations = await deleteProductByIDValidations(id);

  if (allValidations.err) return allValidations;

  const deletedProduct = await db.deleteProductByID(id);

  return deletedProduct;
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
