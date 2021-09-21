const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
    if (name.length < 5) {
        return { err: {
        code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
    }
    if (quantity < 1) {
        return { err: {
        code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
    }
    if (typeof quantity === 'string') {
        return { err: {
        code: 'invalid_data', message: '"quantity" must be a number' } };
    }

    const product = await productsModel.findByName(name);
     if (product) return { err: { code: 'invalid_data', message: 'Product already exists' } };

    const createdProduct = await productsModel.create(name, quantity);
    return { product: createdProduct };
};

const getById = async (id) => {
    const product = await productsModel.getById(id);

    return product;
};

const remove = async (id) => {
    const result = await productsModel.remove(id);

    if (!result) return { err: { code: 'invalid_data', message: 'Wrong id format' } };

    return result;
};

const getAll = async () => {
    const products = await productsModel.getAll();

    return products;
};

module.exports = {
    create,
    getById,
    remove,
    getAll,
};
