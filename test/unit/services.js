const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');

const ProductService = require('../../services/ProductService');

describe('Insere um novo produto no BD', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(DB_NAME));
  
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quando o payload informado não é válido', () => {
    let payloadProduct = {};

    describe('pois o nome não atente aos requisitos', () => {
      payloadProduct = {
        name: 'abc',
        quantity: 1,
      }

      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);
        console.log(response);

        expect(response).to.be.a('object');
      });

      it.only('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err } = response;

        expect(response).to.have.property(err, code);
        expect(response).to.have.property(err, message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('"name" length must be at least 5 characters long');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade é um valor menor ou igual a 0', async () => {
      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err } = response;

        expect(response).to.have.property(err, code);
        expect(response).to.have.property(err, message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('"quantity" must be at larger than or equal to 1');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('invalid_data');
      });
    });

    describe('pois a quantidade não é um número', () => {
      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err } = response;

        expect(response).to.have.property(err, code);
        expect(response).to.have.property(err, message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('"quantity" must be a number');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('invalid_data');
      });
    });

    describe('pois o produto já foi cadastrado', () => {
      it('retorna um objeto', async () => {
        const response = await ProductService.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui um objeto "err" com as chaves "code" e "message"', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err } = response;

        expect(response).to.have.property(err, code);
        expect(response).to.have.property(err, message);
      });

      it('a chave "code" deste objeto possui o código correto', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { code } } = response;

        expect(code).to.equal('"Product" already exists');
      });

      it('a chave "message" possui a mensagem correta', async () => {
        const response = await ProductService.create(payloadProduct);
        const { err: { message } } = response;

        expect(message).to.equal('invalid_data');
      });
    });
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.have.a.property('_id');
    });

    it('deve existir um produto com o nome e a quantidade cadastrada', async () => {
      await ProductService.create(payloadProduct);

      const movieCreated = await connectionMock.collection('products').findOne({name: payloadProduct.name, quantity: payloadProduct.quantity});

      expect(movieCreated).to.deep.include(payloadProduct);
    });
  });
});