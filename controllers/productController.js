const productService = require('../service/productService');

// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_BODY_STATUS = 422;
const HTTP_422 = 422;
// const HTTP_NOT_FOUND_STATUS = 404;

// const songService = require('../services/songService');

// const getAll = async (_req, res) => {
//   const songs = await songService.getAll();

//   res.status(HTTP_OK_STATUS).json(songs);
// };

// const getById = async (req, res) => {
//   const song = await songService.getById(req.params.id);

//   if (!song) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Song not found!' });

//   res.status(HTTP_OK_STATUS).json(song);
// };

const register = async (req, res) => {
  const { name, quantity } = req.body;

  const { err, _id } = await productService.register(name, quantity);

  if (err) return res.status(HTTP_422).json({ err });
  res.status(HTTP_CREATED_STATUS).json({ _id, name, quantity });
};

// const remove = async (req, res) => {
//   const song = await songService.getById(req.params.id);

//   if (!song) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Song not found!' });

//   await songService.remove(req.params.id);

//   res.status(HTTP_NO_BODY_STATUS).end();
// };

module.exports = {
    register,
}; 