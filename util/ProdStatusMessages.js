const PROD_ERR_STATUS_MESSAGE = { 

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

        WRONG_PRODUCTID_INVALID_QTY: { 
            err: { 
                code: 'invalid_data', 
                message: 'Wrong product ID or invalid quantity',
            },
        },

        QTY_NOT_NUMBER: { 
            err: { 
                code: 'invalid_data', 
                message: '"quantity" must be a number',
            }, 
        },
        ID_NOT_EXISTS: { 
            err: { 
                code: 'not_found', 
                message: 'Sale not found',
            }, 
        },
    };

module.exports = PROD_ERR_STATUS_MESSAGE;