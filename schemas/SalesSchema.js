const ProductSchema = require('./ProductSchema');

const messageErrors = {
  bodyIsNotArray: 'body must be an array',
  invalidQuantityOrProductID: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleOrId: 'Wrong sale ID format',
};

const codeErrors = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
};

const quantityValidate = ({ quantity }) => typeof quantity !== 'number' || quantity <= 0;

/* Materiais consultados para realização das funções assíncronas filterAsync e everyAsync:
  -https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise
  -https://advancedweb.hu/how-to-use-async-functions-with-array-some-and-every-in-javascript/
*/

const filterAsync = (array, filter) => 
  Promise.all(array.map((entry) => filter(entry)))
    .then((bits) => array.filter(() => bits.shift()));

const everyAsync = async (arr, filter) => (await filterAsync(arr, filter)).length === arr.length;

const validate = async (itensSold) => {
  const { findByIdFilter } = ProductSchema;
  
  if (!Array.isArray(itensSold)) {
    return {
      err: { code: codeErrors.invalidData, message: messageErrors.bodyIsNotArray },
    };
  }

  const wrongProductId = await everyAsync(itensSold, findByIdFilter);
  
  if (itensSold.find(quantityValidate) || !wrongProductId) {
    return {
      err: { code: codeErrors.invalidData, message: messageErrors.invalidQuantityOrProductID },
    };
  }

  return {};
};

const saleNotFound = (sale) => {
  if (!sale) {
    return { err: { 
      code: codeErrors.notFound,
      message: messageErrors.saleNotFound,
    },
  };
  }
  return {};
};

const validateRemove = (removedSale) => {
  if (!removedSale) {
    return { 
      err: { code: codeErrors.invalidData, message: messageErrors.wrongSaleOrId }, 
    }; 
  }
  return {};
};

module.exports = {
  validate,
  saleNotFound,
  validateRemove,
};
