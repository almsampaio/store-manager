const errors = {
    nameBlank: '"name" length must be at least 5 characters long',
    wrongQtty: '"quantity" must be larger than or equal to 1',
    stringQtty: '"quantity" must be a number',
};

const nameTooSmall = (name, size) => (name.length < size);
const invalidQtty = (quantity) => (quantity < 1);
const qttyIsString = (quantity) => (typeof quantity === 'string');

const productValidate = (name, quantity) => {
    const code = 'invalid_data';
    switch (true) {
        case nameTooSmall(name, 5): return { err: { code, message: errors.nameBlank } };
        case invalidQtty(quantity): return { err: { code, message: errors.wrongQtty } };
        case qttyIsString(quantity): return { err: { code, message: errors.stringQtty } };
        default: return {};
    }
};

module.exports = {
    productValidate,
};
