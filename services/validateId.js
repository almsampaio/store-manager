const { findById } = require('../models');

const validateIdProduct = async (id) => {
    try {
        await findById(id);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = validateIdProduct;