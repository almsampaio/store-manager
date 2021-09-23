const salesModel = require('../models/salesModel');

const add = async (itensSold) => salesModel.add(itensSold);

const getAll = async () => salesModel.getAll()
  .then((sales) => ({ sales }));

const getById = async (id) => salesModel.getById(id); 

const update = async (productId, quantity) => (
  salesModel.update(productId, quantity)
    .then(([sale]) => ({ ...sale, itensSold: [sale.itensSold] }))
);

module.exports = {
  add,
  getAll,
  getById,
  update,
};
