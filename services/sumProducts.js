const {
    findById,
    updateById,
} = require('../models');

const sumProduct = async (product) => {
    const oldProduct = await findById(product.productId, 'products');
    const newProduct = { ...product };
    newProduct.quantity = product.quantity + oldProduct.quantity;
    await updateById(newProduct.productId, 'products', newProduct);
};

module.exports = sumProduct;