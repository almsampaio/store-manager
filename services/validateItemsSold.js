const validateArrId = require('./validateArrId');
const validateArrQuantity = require('./validateArrQuantity');

const jsonError = {
    err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
    },
};

const validateItemsSold = (req, res, next) => {
    const { body } = req;
    const isQuantityValid = validateArrQuantity(body);
    const isIdValid = validateArrId(body);
    if (!isIdValid || !isQuantityValid) return res.status(422).json(jsonError);
    next();
};

module.exports = validateItemsSold;