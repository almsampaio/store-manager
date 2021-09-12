const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/ProductsController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

// cadastro de produtos
app.post('/products', ProductsController.create);

// listar produtos
app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);

// atualizar produto
app.put('/products/:id', ProductsController.update);

// deletar produto /products/:id
// app.delete('/products/:id', null);

app.listen(3000, () => console.log('WoPhi!'));