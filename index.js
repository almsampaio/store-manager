const express = require('express');
const bodyParse = require('body-parser');

const app = express();
const SERVER_PORT = 3000;

app.use(bodyParse.json());

const serviceProducts = require('./services/products');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (req, res) => {
  const allProducts = await serviceProducts.getAll();
  return res.status(200).json({ products: allProducts });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getById(id);
  if (product.err1) return res.status(product.err2.errCode).json(product.err1);
  return res.status(200).json(product);
});

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await serviceProducts.create(name, quantity);
  
  if (newProduct.err1) {
 return res.status(newProduct.err2.errCode)
  .json(newProduct.err1); 
}

  return res.status(201).json(newProduct);
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await serviceProducts.update(id, name, quantity);

  if (updateProduct.err1) {
    return res.status(updateProduct.err2.errCode).json(updateProduct.err1);
  }
  return res.status(200).json(updateProduct);
});

app.listen(SERVER_PORT, () => console.log('servidor rodando!!'));