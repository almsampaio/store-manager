const express = require('express');
const productsService = require('../services/productsService');
const productsMiddlewares = require('../middlewares/middlewareProducts');
const ProductsRouter = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATE_STATUS = 201;


ProductsRouter.get('/', async (req, res) => {
  const products = await productsService.listAll();
  return res.status(HTTP_OK_STATUS).json({ products: products });
});

ProductsRouter.get('/:id',
  productsMiddlewares.validaId,
  async (req, res) => {
    const { id } = req.params;
    const product = await productsService.listProductId(id);
    return res.status(HTTP_OK_STATUS).json(product);
  });
  
ProductsRouter.put('/:id',
  productsMiddlewares.validaId,
  productsMiddlewares.validaName,
  productsMiddlewares.validaQuantidade,
  async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productsService.editProduct(id, name, quantity);
    return res.status(HTTP_OK_STATUS).json(product);
  });

ProductsRouter.delete('/:id',
  productsMiddlewares.validaId,
  async (req, res) => {
    const { id } = req.params;
    const product = await productsService.deleteProduct(id);
    return res.status(HTTP_OK_STATUS).json(product);
  }
);

ProductsRouter.post('/', productsMiddlewares.validaName,
  productsMiddlewares.validaProduto,
  productsMiddlewares.validaQuantidade,
  async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productsService.registerProduct(name, quantity);

    if(product.err) return res.status(HTTP_UNPROCESS_CLIENT).json(product);

    return res.status(HTTP_CREATE_STATUS).json(product);
    
  });



module.exports = ProductsRouter;