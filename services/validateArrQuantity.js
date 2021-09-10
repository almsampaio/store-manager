const validateArrQuantity = (itemsArr) => {
    const refinedArr = itemsArr.map(({ quantity }) => quantity);
    let returnBool = true;
    refinedArr.forEach((element) => {
        if (typeof element !== 'number' || element < 1) returnBool = false;
    });
    return returnBool;
};

module.exports = validateArrQuantity;