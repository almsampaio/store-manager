module.exports = {
  defaultServerResponse: {
    status: '',
    message: '',
    err: {
      code: '',
      message: '',
    },
    body: {},
  },
  productMessage: {
    PRODUCT_CREATED: 'Product Created Successfully',
    DUPLICATE_NAME: 'Name already exist with given name',
    DATA_INVALID: 'invalid_data',
    PRODUCT_EXISTING: 'Product already exists',
    PRODUCT_FETCHED: 'Product Fetched Successfuly',
    PRODUCT_NOT_FOUND: 'Product Not Found',
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
  },
  dataBaseMessage: {
    INVALID_ID: 'Wrong id format',
  },
};
