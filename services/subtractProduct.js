const {
    updateById,
    findById,
} = require('../models');

const subtractProduct = async (product) => {    
    const oldProduct = await findById(product.productId, 'products');    
    const newProduct = { ...product };
    if (oldProduct.quantity - newProduct.quantity < 0) {
        throw new Error('it is not possible to subtract this numbers');
    }
    newProduct.quantity = oldProduct.quantity - product.quantity;
    await updateById(newProduct.productId, 'products', newProduct);
    return true;
};

module.exports = subtractProduct;