const { create } = require('../../models/Products'); 

const { created } = require('../../utils/httpStatus');
//
const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const createdProduct = await create({ name, quantity });

  res.status(created).json(createdProduct);
};

module.exports = addProduct;
