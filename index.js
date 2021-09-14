const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/Products');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/products', productRoutes);

app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
