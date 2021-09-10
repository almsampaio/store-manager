const insertAndReturnOne = require('./insertAndReturnOne');
const validateQuantityType = require('./validateQuantityType');
const validateQuantityValue = require('./validateQuantityValue');
const validateName = require('./validateName');
const validateNameInTable = require('./validateNameInTable');
const findManyOrByIdProducts = require('./findManyOrByIdProducts');
const updateAndReturnOne = require('./updateAndReturnOne');
const deleteOneProduct = require('./deleteOneProduct');
const validateItemsSold = require('./validateItemsSold');
const insertAndReturnSale = require('./insertAndReturnSale');

module.exports = {
    insertAndReturnOne,
    validateName,
    validateNameInTable,
    validateQuantityType,
    validateQuantityValue,
    findManyOrByIdProducts,
    updateAndReturnOne,
    deleteOneProduct,
    validateItemsSold,
    insertAndReturnSale,
};
