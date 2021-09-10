const { updateById } = require('../models');

const updateAndReturnOne = async (id, product) => {
    const { modifiedCount } = await updateById(id, product);
    return modifiedCount;
};

module.exports = updateAndReturnOne;