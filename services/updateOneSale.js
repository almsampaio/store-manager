const updateById = require('../models/updateById');

const updateOneSale = async (id, items) => {
    const itensSold = [...items];
    try {
        await updateById(id, 'sales', { itensSold });
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = updateOneSale;