const createProductModel = require('../model/products/ProductsModel');

const createProductService = async (name, qty) => {
    if (name.length < 5) {
        return { err: 'name tem q ser maior q 5' };
    }

    if (qty <= 0) {
        return { err: 'qty deve ser maior q zero' };
    }

    const result = await createProductModel(name, qty);
    return result;
}; 

module.exports = createProductService;