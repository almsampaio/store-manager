const { getById, update } = require('../models/productsModel');

const saleValidate = (itensSold) => {
    const err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    for (let i = 0; i < itensSold.length; i += 1) {
        if (itensSold[i].quantity < 1 || typeof itensSold[i].quantity === 'string') {
            return err;
        }
    }
    return {};
};

const updateProducts = async (sale) => {
    const { productId, quantity } = sale[0];
    const product = await getById(productId);
    const updateQtty = product.quantity + quantity;
    await update(productId, product.name, updateQtty);
};

const sellProducts = async (sale) => {
    const { productId, quantity } = sale[0];
    const product = await getById(productId);
    const updateQtty = product.quantity - quantity;
    await update(productId, product.name, updateQtty);
};

module.exports = {
    saleValidate,
    updateProducts,
    sellProducts,
};
