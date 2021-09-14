const subtractProduct = require('./subtractProduct');

const updateToSubtract = async (saleArr) => {
    await saleArr.forEach(async (product) => subtractProduct(product).catch((e) => e));    
};

module.exports = updateToSubtract;