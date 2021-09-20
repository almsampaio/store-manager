const { expect } = require('chai');
const { MongoMemoryServer } = require('mongodb-memory-server');
const MongoClient = require('mongodb/lib/mongo_client');

const model = require('../../models');
const { dbConnection } = require('../../models/connection');

describe('Teste da conexão com o banco', () => {
  it('conecta com sucesso com o banco correto', async () => {
    const testConnection = await dbConnection();
    
    expect(testConnection.databaseName).to.be.equal('StoreManager')
  });
})

describe('Testes da camada model', () => {
  const mockData = {
    productPayload : {
      name: 'test product',
      quantity: 100,
    },
    salePayload : {
      test: 'test'
    }
  };

	let DBServer = new MongoMemoryServer();

  const testConnection = async () => {
    const MONGO_DB_URL = await DBServer.getUri();
    const DB_NAME = 'baseDeTeste'
    const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

    return MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((connect) => connect.db(DB_NAME))
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  };

  before(async () => mongod = await MongoMemoryServer.create());
  after(async () => await mongod.stop());

  describe('Quando um registro é inserido com sucesso', () => {
    it('retorna o objeto cadastrado com sucesso', async () => {
      const test = await model.create(testConnection, 'products', mockData.productPayload)

      expect(test).to.be.a('object');
    })

    it('os dados conferem com os dados colocados para cadastro', async () => {
      const {name, quantity} = await model.create(testConnection, 'products', mockData.productPayload)

      expect(name).to.be.equal(mockData.productPayload.name);
      expect(quantity).to.be.equal(mockData.productPayload.quantity);
    })
  });
});