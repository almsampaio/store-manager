const saleValidate = (itensSold) => {
    const err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    for (let i = 0; i < itensSold.length; i += 1) {
        if (itensSold[i].quantity < 1 || typeof itensSold[i].quantity === 'string') {
            return err;
        }
    }
    return {};
};

module.exports = {
    saleValidate,
};
