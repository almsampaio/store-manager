const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

// cadastro de produtos /products
app.post('/products', productsController.create);

// listar produtos /products ou /products/:id
// app.get('/products', productsController.getAll);
// app.get('/products/:id', null);

// atualizar produto /products/:id
// app.put('/products/:id', null);

// deletar produto /products/:id
// app.delete('/products/:id', null);

app.listen(3000, () => console.log('REST, here we go!'));