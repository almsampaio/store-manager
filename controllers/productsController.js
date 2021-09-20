const ProductsService = require('../services/productsServices');
const { UNPROCESSABLE_ENTITY, SUCCESS_CREATED } = require('../utils/HttpStatusCodes');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsService.create(name, quantity);

  if (!newProduct) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    }); 
  } 
  
  return res.status(SUCCESS_CREATED).json(newProduct);   
};

module.exports = { create };