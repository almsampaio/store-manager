const { updateById } = require('../models');

const updateAndReturnOne = async (id, product) => {
    const { modifiedCount } = await updateById(id, 'products', product);
    return modifiedCount;
};

module.exports = updateAndReturnOne;