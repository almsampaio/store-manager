const {
    findAll,
    findById,
} = require('../models');

const findManyOrByIdProducts = async (id = false) => {    
    if (!id) return findAll('products');    
    const product = await findById(id, 'products');
    return product;
};
module.exports = findManyOrByIdProducts;