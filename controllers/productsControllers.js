// const services = require('../services/productsServices');
const model = require('../models/productsModel');

const getAll = async (_req, res) => {
  const allProducts = await model.getAll();
  return res.status(200).json({ products: allProducts });
};

const getById = async (_req, res) => {
  const product = await model.getById();

  if (!product) {
    return res.status(422).json({ err: 
      { message: 'Wrong id format', code: 'invalid_data' },
    });
  }

  return res.status(200).json({ product });
};

const add = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const addProduct = await model.add(name, quantity);
    return res.status(200).json(addProduct);
  } catch (error) {
    return res.status(500).json({ message: 'erro' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const addProduct = await model.update(id, name, quantity);
  return res.status(200).json(addProduct);
};

// const remove = async (req, res) => {
// };

module.exports = { getAll, add, getById, update };
