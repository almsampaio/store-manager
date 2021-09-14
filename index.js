const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('app in running on port 3000');
});
