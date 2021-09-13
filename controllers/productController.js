const productService = require('../services/productService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_BODY_STATUS = 422;
const HTTP_422 = 422;

// const songService = require('../services/songService');

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(HTTP_OK_STATUS).json({ products });
};

const getById = async (req, res) => {
  const product = await productService.getById(req.params.id);

  if (!product) {
 return res.status(HTTP_422)
  .json({ err: { code: 'invalid_data', message: 'Wrong id format' } }); 
}

  res.status(HTTP_OK_STATUS).json(product);
};

const register = async (req, res) => {
  const { name, quantity } = req.body;

  const { err, _id } = await productService.register(name, quantity);

  if (err) return res.status(HTTP_422).json({ err });
  res.status(HTTP_CREATED_STATUS).json({ _id, name, quantity });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productService.update(id, name, quantity);

  res.status(200).json(product);
};

// const remove = async (req, res) => {
//   const song = await songService.getById(req.params.id);

//   if (!song) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Song not found!' });

//   await songService.remove(req.params.id);

//   res.status(HTTP_NO_BODY_STATUS).end();
// };

module.exports = {
    register,
    getAll,
    getById,
    update,
}; 