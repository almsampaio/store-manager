const { create } = require('../../models/Products'); 

const { created } = require('../../utils/httpStatus');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const { _id } = await create({ name, quantity });
  
  res.status(created).json({ _id, name, quantity });
};

module.exports = addProduct;
