// const SalesModel = require('../models/SalesModel');
// const ProductModel = require('../models/ProductModel');
const ProductSchema = require('./ProductSchema');

const messageErrors = {
  bodyIsNotArray: 'body must be an array',
  invalidQuantityOrProductID: 'Wrong product ID or invalid quantity',
};

const codeErrors = {
  invalidData: 'invalid_data',
};

// const arraySales = {
//   itensSold: [
//     { 
//       productId: '614116aa8ef1e8004d2e3d7a',
//       quantity: 5,
//     },
//     {
//       productId: '1',
//       quantity: 5,
//     },
//     {
//       productId: '614117088ef1e8004d2e3d7b',
//       quantity: 5,
//     },
//   ],
// };

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

// validate(arraySales).then((data) => console.log(data));

module.exports = {
  validate,
};
