const sinon = require('sinon');
const { expect } = require('chai');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductsModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');
const { MongoClient } = require('mongodb');

describe('Teste da camada de Produto', () => {
    let connectionMock;

    const payloadProduct = {
        name: 'Example Product',
        Quantity: 5,
    };

beforeAll(async () => { //cria dublê
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParse: true,
        useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
});

after(() => {
    await MongoClient.connection.db('StoreManager').collection('products').deleteMany({});
    mongoConnection.connection.restore();
 });

 describe('Confirma o nome do banco correto', () => {
    it('Conecta corretamente com o banco', async () => {
      const connectionSuccess = await mongoConnection.connection();
      const dbName = connectionSuccess.databaseName;
      expect(dbName).to.be.eq('StoreManager');
    });
  });

  describe('Teste da função getAll', () => {
    it('Tem como retorno um array', async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.a('array');
    });

    it('Tem as chaves id, name e quantity dentro do objeto', async () => {
        const [response] = await ProductsModel.getAll();
        expect(response).to.include.all.keys('_id', 'quantity', 'name');
    })
  });

 describe('quando o produto é criado com sucesso pela função create', () => {
     it('retorna um objeto', async() => {
        const response = await ProductsModel.create(payloadProduct);

        expect(response).to.be.a('object');
     });

     it('esse objeto possui um id do novo produto inserido', async () => {
         const response = await ProductsModel.create(payloadProduct);

         expect(response).to.have.a.property('_id');
     });

     it('deve existir um produto com o nome cadastrado!', async () => {
        await ProductsModel.create(payloadProduct);
        const productCreated = await connectionMock.collection('products').findOne({ name: payloadProduct.name });
        expect(productCreated).to.be.not.null;
      });

 });

    describe('Busca corretamente um produto pela sua id', () => {
        it('Retorna null se o id não for válido', async () => {
            const response = await ProductsModel.getById('teste');
            expect(response).to.be.equal(null);
        })
    });
});