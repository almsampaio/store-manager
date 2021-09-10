const err = {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
};

const validateQuantityValue = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity < 1) return res.status(422).json({ err });
    next();
};

module.exports = validateQuantityValue;