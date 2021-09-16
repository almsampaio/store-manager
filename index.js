const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./src/controllers/ProductController');

const { SERVER_PORT } = require('./src/config/server');

const app = express();
app.use(bodyParser.json());

app.get('/', async (_request, response) => {
  response.send();
});

// Products
app.get('/products/:id', ProductController.findById);
app.get('/products', ProductController.listAll);
app.post('/products', ProductController.create);

app.listen(SERVER_PORT);
