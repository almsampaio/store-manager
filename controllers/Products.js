const productService = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);

  if (!newProduct) {
 return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  }); 
}

  return res.status(201).json(newProduct);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  return res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productService.update(id, name, quantity);

  if (!updatedProduct) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  res.status(200).json({
    _id: id,
    name,
    quantity,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};