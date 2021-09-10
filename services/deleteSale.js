const { deleteOneById } = require('../models');

const deleteSale = async (id) => deleteOneById(id, 'sales');

module.exports = deleteSale;