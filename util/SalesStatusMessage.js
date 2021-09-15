const SALE_ERR_STATUS_MESSAGE = { 

    ALREADY_EXISTS: { 
        err: { 
            code: 'invalid_data', 
            message: 'Product already exists', 
        },
    },
    
    NAME_LENGTH: { 
            err: { 
                code: 'invalid_data', 
                message: '"name" length must be at least 5 characters long',
            },
    },

    ERR_QTY: { 
        err: { 
            code: 'invalid_data', 
            message: 'Wrong product ID or invalid quantity',
        },
    },
    
    ID_NOT_EXISTS: { 
        err: { 
            code: 'not_found', 
            message: 'Sale not found',
        }, 
    },
};

module.exports = SALE_ERR_STATUS_MESSAGE;