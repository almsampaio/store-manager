const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

// cadastro de produtos /products
app.post('/products', null);

// listar produtos /products ou /products/:id
// app.get('/products/:id', null);

// atualizar produto /products/:id
// app.put('/products/:id', null);

// deletar produto /products/:id
// app.delete('/products/:id', null);

app.listen(3001, () => console.log('REST, here we go!'));