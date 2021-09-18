const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// const productsControllers = require('./controllers/products');

const newProduct = require('./routes/products');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} xablau`);
});

app.use('/products', newProduct);

// app.post('/products', productsControllers.create);

// console.log(productsControllers.create);
// console.log(productsControllers);

// qual rota será executada
// o controler chama o service
// service chama o model
// model chama db

// primeiro conectar ao db
// executar a query para listar produtos
// chamar no service
// passar ao controllers
// difinir a rota
// devolver a lista de produtos na requisição