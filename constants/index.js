module.exports = {
  defaultServerResponse: {
    status: '',
    err: {
      code: '',
      message: '',
    },
    body: {},
  },
  productMessage: {
    PRODUCT_FETCHED: 'Product Fetched Successfuly',
    PRODUCT_UPDATED: 'Product Updated Successfully',
    PRODUCT_CREATED: 'Product Created Successfully',
    PRODUCT_EXISTING: 'Product already exists',
    PRODUCT_NOT_FOUND: 'Product Not Found',
    DUPLICATE_NAME: 'Name already exist with given name',
    DATA_INVALID: 'invalid_data',
  },
  salesMessage: {
    status: '',
    body: {},
  },
  sales: {
    SALES_NOT_FOUND: 'Sales Not Found',
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
  },
  dataBaseMessage: {
    INVALID_ID: 'Wrong id format',
  },
};
