const express = require('express');

const { ObjectId } = require('bson');
const validateNameLength = require('./middlewares/validateNameLength');
const validateQuantityLength = require('./middlewares/validateQuantityLength');
const validateQuantityTypeof = require('./middlewares/validateQuantityTypeof');
const validateTheProductRepeats = require('./middlewares/validateTheProductRepeats');
const {
  createNewProduct,
  getProductAll,
  findById,
  updateProduct } = require('./models/productsModels');

const validantionsName = [validateNameLength, validateTheProductRepeats];
const validantionsQuantity = [validateQuantityTypeof, validateQuantityLength];

const router = express.Router();

// Cadastra um novo produto
router.post('/', validantionsName, validantionsQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await createNewProduct(name, quantity);
  res.status(201).json({ _id: new ObjectId(newProduct), name, quantity });
});

// Lista todos os produtos cadastrados
router.get('/', async (_req, res) => {
  const productsAll = await getProductAll();
  res.status(200).json({ products: productsAll });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await findById(id);
  console.log('Retorno do products:', product);
  if (product === null) {
    return res.status(422).json({
      err:
        { code: 'invalid_data', message: 'Wrong id format' },
    });
  }
  return res.status(200).json(product);
});

router.put('/:id', validateNameLength, validantionsQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const update = await updateProduct(id, name, quantity);
  res.status(200).json(update.value);
});

module.exports = router;