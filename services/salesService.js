const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { saleValidate, updateProducts, sellProducts } = require('../schemas/salesSchema');

const create = async (sale) => {
    const validations = saleValidate(sale);

    if (validations.err) return validations;

    const { productId, quantity } = sale[0];

    const product = await productsModel.getById(productId);

    const updateQtty = product.quantity - quantity;

    if (updateQtty < 0) {
        return { status: 404,
            err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } };
    }
    sellProducts(productId, updateQtty);

    const createdSale = await salesModel.create(sale);

    return { createdSale };
};

const getAll = async () => {
    const sales = await salesModel.getAll();
  
    return { status: 200, data: sales };
};

const getById = async (id) => {
    const sale = await salesModel.getById(id);
    return sale;
};

const update = async (id, sale) => {
    const validations = saleValidate(sale);

    if (validations.err) return validations;

    const updatedSale = await salesModel.update(id, sale);

    return updatedSale;
};

const remove = async (id) => {
    const { sale } = await salesModel.getById(id);
    updateProducts(sale);
    await salesModel.remove(id);
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
    update,
};
