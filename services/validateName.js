const err = {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
};

const validateNameLength = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 5) return res.status(422).json({ err });
    next();
};

module.exports = validateNameLength;