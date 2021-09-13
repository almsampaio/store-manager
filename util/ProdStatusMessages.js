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

        QTY_BELOW_ZERO: { 
            err: { 
                code: 'invalid_data', 
                message: '"quantity" must be larger than or equal to 1',
            },
        },

        QTY_NOT_NUMBER: { 
            err: { 
                code: 'invalid_data', 
                message: '"quantity" must be a number',
            }, 
        },
    };

module.exports = PROD_ERR_STATUS_MESSAGE;