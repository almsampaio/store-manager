const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsRoute = require('./routes/prodRoutes'); 
const salesRoute = require('./routes/salesRoutes'); 

const app = express();
app.use(bodyParser.json());

app.use(productsRoute);
app.use(salesRoute);

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT);