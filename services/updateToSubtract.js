const subtractProduct = require('./subtractProduct');

const updateToSubtract = async (saleArr) => {
    const asyncronousArr = [];
    saleArr.forEach((element) => {
        asyncronousArr.push(subtractProduct(element));
    });
    const resultArr = await Promise.all(asyncronousArr);
    if (resultArr.some((element) => element === false)) {        
        throw new Error('erro do subtract');
    }
};

module.exports = updateToSubtract;