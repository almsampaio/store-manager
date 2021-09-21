const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/Products');
const salesRoutes = require('./routes/Sales');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
