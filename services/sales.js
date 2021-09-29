const { create } = require('../db/models/sale');

async function createService(data) {
  const addSale = await create(data);
  return addSale;
}

module.exports = { createService };
