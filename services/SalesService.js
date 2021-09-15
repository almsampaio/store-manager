const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');

const create = async (arraySold) => {
  const validation = await SalesSchema.validate(arraySold);
  if (validation.err) {
    return validation;
  }

  const sales = await SalesModel.create(arraySold);

  return sales;
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

// create(arraySales).then((data) => console.log(data));

module.exports = {
  create,
};
