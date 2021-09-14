const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/Product');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/product', productRoutes);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
