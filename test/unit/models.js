// const sinon = require('sinon');
// const { expect } = require('chai');
// const { MongoClient } = require('mongodb');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// const mongoConnection = require('../../models/connection');
// const productsModel = require('../../models/products');

// describe('Insere um produto no banco de dados', () => {
//   before (async () => {
//     const DBServer = new MongoMemoryServer();
//     const URLMock = await DBServer.getUri();

//     connectionMock = await MongoClient 
//       .connect(URLMock, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((conn) => conn.db('StoreManager'));

//     sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
//   });

//   after(() => mongoConnection.connection.restore());

//   describe('Retorna um objeto quando', () => {
//     it('O produto é adicionado com sucesso', async () => {
//       const response = await productsModel.createProduct('teste', 5);

//       expect(response).to.be.have.property('_id');
//       expect(response.name).to.be.equal('teste');
//       expect(response.quantity).to.be.equal(5);
//     });
//   });
// });

// describe('Busca um produto no banco de dados', () => {
//   let connectionMock;

//   before (async () => {
//     const DBServer = new MongoMemoryServer();
//     const URLMock = await DBServer.getUri();
//     const OPTIONS = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     connectionMock = await MongoClient
//       .connect(URLMock, OPTIONS)
//       .then((conn) => conn.db('StoreManager'));

//     sinon.stub(mongoConnection, 'connection');
//   });

//   after(() => mongoConnection.connection.restore());

//   describe('Pelo nome', () => {

//     before(async () => await productsModel.createProduct('produto', 100));

//     it('Possue nome "teste"', async () => {
//       const product = await productsModel.getProductByName('produto');

//       expect(product.name).to.be.equal('produto');
//     });

//     it('Possue quantidade "100"', async () => {
//       const product = await productsModel.getProductByName('produto');

//       expect(product.quantity).to.be.equal(100);
//     })
//   });
// });
