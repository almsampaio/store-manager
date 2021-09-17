const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const validateQuantity = async (quantity) => {
    if (quantity <= 0 || typeof (quantity) === 'string') {
        return 'Wrong product ID or invalid quantity';
    }

    return null;
};

const addValidation = async (array) => {
    const objectSales = array[0];

    const answer = await validateQuantity(objectSales.quantity);

    const existingId = await productModel.existingId(objectSales.productId);

    if (existingId === null) {
        return 'Wrong product ID or invalid quantity';
    }
    if (answer === null) {
        const create = await salesModel.add(array);
        return create;
    } 
        return answer;
};

const updateValidation = async (id, array) => {
    const objectSales = array[0];

    const answer = await validateQuantity(objectSales.quantity);
    if (answer === null) {
        const update = await salesModel.update(id, array);
        return update;
    }
    return answer;
};

module.exports = { addValidation, updateValidation }; 