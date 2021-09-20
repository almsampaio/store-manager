/* Não esquecer de:
1. Iniciar o serviço do mongodb no pc pelo comando:
sudo service mongod start

2. Instalar o pacote mongodb no projeto
npm install mongodb

3. Corrigir o problema do "const utf8Encoder = new TextEncoder()" através da
execução do através do arquivo fixMongodbErrorUtf8Encoder.bash.
*/

/* EXECUTAR O COMANDO ABAIXO NO MONGODB OU MONGOSH

use StoreManager;
db.products.insertMany([
    { "name": "Produto Silva", "quantity": 10 },
]);

use StoreManager;
db.sales.insertMany([
    { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] },
]);

*/