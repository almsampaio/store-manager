const express = require('express'); // importando express
const bodyParser = require('body-parser'); // importando bodyParser: utilizado para traduzir infos lidas do banco p/ json.
const productRoutes = require('./routes/productRoutes'); // importando rotas

const PORT = 3000;
const app = express(); // instanciando objeto express
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`App online na porta ${PORT}`);
});
