   const salesModel = require('../models/salesModel');
   const productsModel = require('../models/productsModel');

const errors = {
    quantityErrorValue: 'Wrong product ID or invalid quantity',
    saleDoesnExistId: 'Sale not found',
    idFormatDoesnExist: 'Wrong sale ID format',
    quantityStockMoreZero: 'Such amount is not permitted to sell',
};

const codeError = 'invalid_data';
const codeNotFound = 'not_found';
const codeErrorStock = 'stock_problem';

const validateQuantity = (itensSold) => {
    const quantityVerified = itensSold.find((item) => 
                             item.quantity <= 0 
                             || typeof item.quantity !== 'number');

    if (quantityVerified) {
           return { err: {
               code: codeError,
               message: errors.quantityErrorValue,
           } };
    }
};

// Requisito 6
const validateSaleDoesntExistId = async (id) => {
    const existingSale = await salesModel.getById(id);

    if (!existingSale) {
        return { err: {
            code: codeNotFound,
            message: errors.saleDoesnExistId,
        } };
    }
};

// Requisito 8
const validateSaleIdRemove = async (id) => {
    const existingSale = await salesModel.getById(id);
    
    if (!existingSale) {
        return { err: {
            code: codeError,
            message: errors.idFormatDoesnExist,
        } };
    }
};

// Requisito 9 = Atualizar a quantidade de produtos

const sumProductQuantity = async (itensSold) => {
    const existingSale = itensSold.find((item) => item);
    
    const listSale = await productsModel.getById(existingSale.productId);

 //   console.log(existingSale.productId);
 //   console.log(listSale); 
    const setQuantity = listSale.quantity - existingSale.quantity;

    return productsModel.update(existingSale.productId, listSale.name, setQuantity);
};

const subProductQuantity = async (id) => {
    const listSale = await salesModel.getById(id);
    const { productId, quantity } = listSale.itensSold[0];

    const listProduct = await productsModel.getById(productId);

    const setQuantity = quantity + listProduct.quantity;
    
  //  console.log(setQuantity);
    
    return productsModel.update(productId, listProduct.name, setQuantity);
};

// Requisito 10: Validando a quantidade de produtos

const validateStockQuantity = async (itensSold) => {
    const existingSale = itensSold.find((item) => item);
    
    const listSale = await productsModel.getAll();

    const getListSale = listSale.find((sale) => sale);
    
   // console.log(existingSale);

    if (getListSale.quantity <= existingSale.quantity) {
   //     console.log(existingSale);
        return { err: {
            code: codeErrorStock,
            message: errors.quantityStockMoreZero,
        } };
    }
};

module.exports = {
    validateQuantity,
    validateSaleDoesntExistId,
    validateSaleIdRemove,
    sumProductQuantity,
    subProductQuantity,
    validateStockQuantity,
};