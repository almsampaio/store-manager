const { findAll, findById } = require('../models');

const findByIdOrAllSales = async (id = false) => {
    if (!id) return findAll('sales');
    const sale = await findById(id);
    return sale;
};

module.exports = findByIdOrAllSales;