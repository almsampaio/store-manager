const validateId = require('./validateId');

const validateArrId = (itensArr) => {
    let returnBool = true;
    const refinedArr = itensArr.map(({ productId }) => productId);
    refinedArr.forEach(async (element) => {
        const temporaryBool = await validateId(element);
        if (!temporaryBool) returnBool = false;
    });
    return returnBool;
};

module.exports = validateArrId;