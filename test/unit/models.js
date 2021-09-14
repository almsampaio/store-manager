const sinon = require('sinon');
const { expect } = require('chai');

const mongoConnection = require('../../MODELS/CONNECTIONS/MongoDBConnection');

const { insertOneProductIntoMongoDB } = require('../../MODELS/ProductsModelMongo');

describe('Quando tentamos inserir no banco de dados,', () => {
  const productPayload = {
    "name": "Produto de teste 1",
    "quantity": 150
  }

  let connectionMock;

  before(() => {
    const ID_INSERT = '15opx454311d68f491ba9944';
    const insertOne = async () => ({ insertedId: ID_INSERT });
    const collection = async () => ({ insertOne });
    const db = async (databaseName) => ({ collection });
    const getConnectionMock = async () => ({ db });

    connectionMock = getConnectionMock()
      .then((conn) => conn.db('model_example'));

    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.connection.restore();
  });

  describe('um produto com o formato correto de nome e quantidade,', () => {
    it('deve retornar um objeto.', () => {
      const response = insertOneProductIntoMongoDB(productPayload);
      expect(response).to.be.a('object');
    });

    it('O objeto deve conter o _id do filme inserido.', () => {
      const response = insertOneProductIntoMongoDB(productPayload);
      expect(response).to.have.a.property('id');
    });
  })
})

