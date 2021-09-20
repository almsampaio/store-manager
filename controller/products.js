const { create, getAllProducts, getById, updateProducts } = require('../service/products');

const createProducts = async (req, res) => {
    const { name, quantity } = req.body;
    const product = await create(name, quantity);
    return res.status(product.statusCode).json(product.json);
  };

  const getAll = async (_req, res) => {
    try {
      const result = await getAllProducts();
      res.status(result.statusCode).json(result.json);
    } catch (error) {
      res.status(422).json({ err: {
        code: 'invalid_data',
        message: 'wrong id format',
      } });
    }
  };

  const getByIdProducts = async (req, res) => {
    const { id } = req.params;
    const result = await getById(id);
    res.status(result.statusCode).json(result.json);
  };

  const update = async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await updateProducts(id, name, quantity);
    res.status(result.statusCode).json(result.json);
  };

module.exports = {
    createProducts,
    getAll,
    getByIdProducts,
    update,
};