const insertAndReturnOne = require('./insertAndReturnOne');
const validateQuantityType = require('./validateQuantityType');
const validateQuantityValue = require('./validateQuantityValue');
const validateName = require('./validateName');
const validateNameInTable = require('./validateNameInTable');
const findManyOrByIdProducts = require('./findManyOrByIdProducts');

module.exports = {
    insertAndReturnOne,
    validateName,
    validateNameInTable,
    validateQuantityType,
    validateQuantityValue,
    findManyOrByIdProducts,
};
