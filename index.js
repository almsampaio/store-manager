const express = require('express');
const bodyParser = require('body-parser');
const RouterProducts = require('./routes/Products');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', RouterProducts);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ messege: err.message });
  return res.status(500).json({ messege: err.message });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});
