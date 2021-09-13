const express = require('express');
const bodyParse = require('body-parser');

const app = express();
const SERVER_PORT = 3000;

app.use(bodyParse.json());

const serviceCreate = require('./services/products');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await serviceCreate.create(name, quantity);
  
  if (newProduct.err1) {
 return res.status(newProduct.err2.errCode)
  .json(newProduct.err1); 
}

  return res.status(201).json(newProduct);
});

app.listen(SERVER_PORT, () => console.log('servidor rodando!!'));