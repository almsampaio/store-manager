const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/ProductController');

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getById);
app.post('/products', ProductController.create);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.remove);

const PORT = 3000;
app.listen(PORT, () => console.log('Example app listening on port port!'));
