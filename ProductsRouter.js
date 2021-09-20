const express = require('express');

const validateNameLength = require('./middlewares/validateNameLength');
const validateQuantityLength = require('./middlewares/validateQuantityLength');
const validateQuantityTypeof = require('./middlewares/validateQuantityTypeof');
const validateTheProductRepeats = require('./middlewares/validateTheProductRepeats');
const Product = require('./controllers/ProductsControllers');

const router = express.Router();

const validantionsName = [validateNameLength, validateTheProductRepeats];
const validantionsQuantity = [validateQuantityTypeof, validateQuantityLength];

//  1. Requisito - Cadastra um novo produto
router.post('/', validantionsName, validantionsQuantity, Product.createNewProduct);
// 2. Requisito - Lista um produto cadastrado de acordo com seu Id
router.get('/:id', Product.listAProductById);
// 2. Requisito -  Lista todos os produtos cadastrados
router.get('/', Product.listProducts);
// 3. Requisito - Atualiza um produto;
router.put('/:id', validateNameLength, validantionsQuantity, Product.updateProduct);
// 4.Requisito - Delea um produto;
router.delete('/:id', Product.deleteProduct);

module.exports = router;