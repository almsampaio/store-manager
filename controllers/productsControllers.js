const services = require('../services/productsServices');
const model = require('../models/productsModel');

const getAll = async (_req, res) => {
  const allProducts = await model.getAll();
  return res.status(200).json({ products: allProducts });
};

const add = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const addProduct = await songsModel.getAll();
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: 'Ops, algo de errado :( ' })
  }
};

// const update = async (req, res) => {
// };

// const remove = async (req, res) => {
// };

module.exports = { getAll, add, update, remove };
