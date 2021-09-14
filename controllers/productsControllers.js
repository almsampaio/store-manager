const services = require('../services/productsServices');
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
  
  const validateName = await services.add(name, quantity);

  if (validateName.err) return res.status(422).json(validateName.err);
  
  return res.status(200).json(validateName);
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

  if (removeProduct.err) return res.status(422).json(removeProduct.err);

  return res.status(200).json(removeProduct);
};

module.exports = { getAll, add, getById, update, remove };
