// conecta service com o model
const salesModel = require('../models/salesModel');

const postSale = async (soldItems) => {
  for (let index = 0; index < soldItems.length; index += 1) {
    if (typeof soldItems[index].quantity !== 'number') return 'Not a Number';
    if (soldItems[index].quantity <= 0) return 'quantity less or equal than 0';
  }

  const sale = await salesModel.postSale(soldItems);
  return sale;
};

module.exports = {
  postSale,
};
