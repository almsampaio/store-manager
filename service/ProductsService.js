const ProductsModel = require('../model/products/ProductsModel');

const productAlreadyExistsErrorMessage = { 
    err: { 
        code: 'invalid_data', 
        message: 'Product already exists', 
    },
};

const productMinLengthErrorMessage = { 
    err: { 
        code: 'invalid_data', 
        message: '"name" length must be at least 5 charactes long',
    },
};

const productQtySizeErrorMessage = { 
    err: { 
        code: 'invalid_data', 
        message: '"quantity" must be larger than or equal to 1',
    }, 
};

const productQtyTypeErrorMessage = { 
    err: { 
        code: 'invalid_data', 
        message: '"quantity" must be a number',
    }, 
};

const createProductService = async (name, quantity) => {
    const prodAlreadyExists = await ProductsModel.findProductName(name);

    if (name.length < 5) return productMinLengthErrorMessage;        
    if (quantity <= 0) return productQtySizeErrorMessage;    
    if (prodAlreadyExists) return productAlreadyExistsErrorMessage;
    if (typeof (quantity) !== 'number') return productQtyTypeErrorMessage;
        
    const result = await ProductsModel.createProductsModel(name, quantity);

    return result;
}; 

module.exports = createProductService;