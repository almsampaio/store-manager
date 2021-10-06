const modelProduct = require('../models/products');

const validName = (name) => {
  if (name.length < 5) {
    return { 
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }
};

const nameDuplicate = async (name) => {
  const productsAll = await modelProduct.getAll();
  const findProduct = productsAll.find((product) => product.name === name);
  if (findProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
};

const notQuantityNegative = (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const notNumberQuantity = (quantity) => {
  if (typeof (quantity) !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

// const verifyStockNewSale = async (salesArray) => {
//   const { itensSold } = salesArray
//   const verifyStockAllProducts = itensSold.map(async (product) => {
//     const { productId, quantity } = product;
//     if (quantity) {
//       const findProduct = await modelProduct.searchById(productId);
//       const newStock = findProduct.quantity - quantity;
//       if (newStock < 0) {
//         return {
//           err: { code: 'stock_problem', message: 'Such amount is not permitted to sell ' },
//         }; 
//        }
//     return true;
//     }
//     return false;
//   });
//   return verifyStockAllProducts;
// };

const validSales = async (salesArray) => {
  const verifyQuantity = await salesArray.find((sale) => sale.quantity <= 0);

  const verifyTypeQuantity = await salesArray.find((sale) => typeof sale.quantity !== 'number');

  const erro = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  if (verifyQuantity || verifyTypeQuantity) {
    return erro;
  }
};

module.exports = {
  validName,
  nameDuplicate,
  notQuantityNegative,
  notNumberQuantity,
  validSales,
  // verifyStockNewSale,
};
