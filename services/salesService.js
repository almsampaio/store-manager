const salesModel = require('../models/salesModel');

const add = async (itensSold) => salesModel.add(itensSold);

const getAll = async () => salesModel.getAll()
  .then((sales) => ({ sales }));

const getById = async (id) => salesModel.getById(id); 

const update = async (productId, quantity) => (
  salesModel.update(productId, quantity)
    .then(([sale]) => ({ ...sale, itensSold: [sale.itensSold] }))
);

const remove = async (id) => salesModel.remove(id);

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
