const {
    findAll,
    findById,
} = require('../models');

const findManyOrByIdProducts = async (id = false) => {    
    if (!id) return findAll();    
    const product = await findById(id, 'products');
    return product;
};
module.exports = findManyOrByIdProducts;