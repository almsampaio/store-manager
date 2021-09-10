const err = {
    code: 'invalid_data',
    message: '"quantity" must be a number',
};

const validateQuantityType = (req, res, next) => {
    const { quantity } = req.body;
    if (typeof quantity === 'string') return res.status(422).json({ err });
    next();
};

module.exports = validateQuantityType;