const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');

// const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/products', ProductController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('ok');
});

app.listen(PORT);
