const services = require('../services/productsServices');
const model = require('../models/productsModel');

const getAll = async (_req, res) => {
  const allProducts = await model.getAll();
  return res.status(200).json({ products: allProducts });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await model.getById(id);

  if (!product) {
    return res.status(422).json({ err: 
      { message: 'Wrong id format', code: 'invalid_data' },
    });
  }

  return res.status(200).json(product);
};

const add = async (req, res) => {
  const { name, quantity } = req.body;
  
  const addProduct = await services.add(name, quantity);

  if (addProduct.err) return res.status(422).json(addProduct);
  
  return res.status(201).json(addProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const addProduct = await model.update(id, name, quantity);
  return res.status(200).json(addProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const removeProduct = await services.remove(id);

  if (removeProduct.err) return res.status(422).json(removeProduct);

  return res.status(200).json(removeProduct);
};

module.exports = { getAll, add, getById, update, remove };
