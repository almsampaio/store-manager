const ProductsService = require('../services/productsServices');
const { UNPROCESSABLE_ENTITY, SUCCESS_CREATED,
  SUCCESS_OK, BAD_REQUEST } = require('../utils/HttpStatusCodes');

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

const getAll = (_req, res) => ProductsService.getAll()
  .then((products) => res.status(SUCCESS_OK).json({ products }));

const getById = (req, res) => {
  const { id } = req.params;
  ProductsService.getById(id)
    .then((product) => res.status(SUCCESS_OK).json(product))
    .catch(() => res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    }));
};

const update = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    await ProductsService.update(id, name, quantity);
    return res.status(SUCCESS_OK).json({ _id: id, name, quantity });       
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      err: {
        code: 'bad_request',
        message: 'Bad request',
      },
    });
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.exclude(id);
  if (!product) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    }); 
  }

  return res.status(SUCCESS_OK).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};